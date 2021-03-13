const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.js');
const ErrorResponse = require('../utils/errorResponse.js');
const User = require('../models/User.js');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for headers, if the 'Authorization' header exists, and if it exists, if it starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Set token from cookie

  // else if (req.cookies.token) {
  // 	token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token by extracting payload
    // Šādi izskatīsies tokens {id: 123424, iat:xxx, expiration}
    // Verificējam tokenu ar mūsu secret key un pārbaudam vai tokens ir valīds: Ja būs valīds, kods turpināsies. Ja nevalīds, izmetīs erroru.
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded);

    // Izveidojam req objektam paramteru user kuram pievienojam lietotāja id, ja tāds lietotājs datu bāzē eksistē.
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    next();
  };
};
