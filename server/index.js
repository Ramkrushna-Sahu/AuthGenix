const express = require('express');
const dotenv = require('dotenv');
const verifyJWT = require('./middleware/verifyJWT');
const Register = require('./routes/register.js'); // Fixed the typo in the import path
const Auth = require('./routes/auth.js');
const Refresh = require('./routes/refreshToken.js');
const Logout = require('./routes/logout.js');
const ForgotPassword = require('./routes/forgotPassword.js');
const UserInfo = require('./routes/userinfo.js');
const credentials = require('./middleware/credentials.js')
const connectDB = require('./config/dbConn.js');
const cors = require('cors');
const corsOptions = require('./config/corsOptions.js');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 2000;

dotenv.config({
  encoding: 'latin1',
  debug: true,
  override: false,
});

app.use(express.json());
// Middleware for URL encoded form data
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '35mb',
    parameterLimit: 50000,
  })
);

// Connect to MongoDB
connectDB();

// Custom middleware logger to log events in log directory
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Built-in middleware to handle URL encoded form data
app.use(express.urlencoded({ extended: true }));

// Built-in middleware for JSON
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Set a cookie
app.use((req, res, next) => {
  // Check if client sent cookie
  const cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // No: set a new cookie
    let randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('Cookie created successfully');
  } else {
    // Yes, cookie was already present
    console.log('Cookie exists', cookie);
  }
  next();
});

// Routes
app.use('/register', Register);
app.use('/auth', Auth);
app.use('/refresh', Refresh);
app.use('/logout', Logout);
app.get('/', (req, res) => {
  res.json({message:'Welcome to AuthStack Project', success: true})
});



app.use('/password', ForgotPassword);

app.use(verifyJWT);

app.use('/userinfo', UserInfo);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
