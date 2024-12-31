const express = require("express")
const { getUser } = require("../controller/userController")
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const User = require('../models/User')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
})
const upload = multer({ storage: storage })

const uploadToDatabase = async(file, username, email)=>{
    if (file && username && email) {
        console.table(file);
        const img = fs.readFileSync(file.path);
        const encode_img = img.toString("base64");
        const resp = await User.findOneAndUpdate(
          { username, email },
          {
            $set: {
              userProfileImage: Buffer.alloc(file.size, encode_img, "base64"),
            },
          }
        ).catch((erro) => {
          return erro;
        });
        fs.unlinkSync(file.path);
        return { success: true, resp };
      }
      return { success: false };
}
router.put(
    "/profileimage",
    upload.single("profilePic"),
    async (req , res) => {
      const data = await uploadToDatabase(
        req.file,
        req.body.username,
        req.body.email
      );
      if (data.success) {
        res.json(data.resp);
      } else {
        res.status(500).send("unable to upload the image");
      }
    }
  );

  router.get("/:username", (req, res) => {
    User.find({ username: req.params.username }).then((resp) => {
      res.json({ resp });
    });
  });

  router.get("/image/:username", (req, res) => {
    User.findOne(
      { username: req.params.username },
      { userProfileImage: 1, _id: 0 }
    ).then((resp) => {
      res.json({ resp });
    });
  });

//   router.put("/update", (req, res) => {
//     res.json({ todo: "TODO", status: true });
//   });

module.exports = router