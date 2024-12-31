const User = require("../models/User")

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(204);
    }
    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    console.log('cookie cleared')
    // res.status(204).json({message:'successfully logged out'})
    res.sendStatus(204)
}

module.exports = handleLogout