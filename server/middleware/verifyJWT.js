const jwt = require('jsonwebtoken');

// Middleware function to verify JWT
const verifyJWT = async (req, res, next) => {
  // Retrieve token from headers
  const token = req.headers.authorization || req.headers.Authorization;

  try {
    // Verify token and decode payload
    const response = jwt.verify(token, process.env.ACCESS_SECRET);

    // Attach user information to request object
    Object.defineProperty(req, 'user', {
      value: response.UserInfo.username,
      writable: false,
    });

    Object.defineProperty(req, 'roles', {
      value: response.UserInfo.roles,
      writable: false,
    });

    // Call next middleware function
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyJWT;
