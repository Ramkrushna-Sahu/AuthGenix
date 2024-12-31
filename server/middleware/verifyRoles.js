const express = require('express');

// Middleware function to verify roles
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if roles are defined on the request object
    if (!req.roles) return res.sendStatus(401);
    
    // Convert allowed roles into an array
    const rolesArray = [...allowedRoles];
    
    const result = req.roles
      .map(role => rolesArray.includes(role))
      .find(val => val === true);
      
    if (!result) return res.sendStatus(401);
    
    next();
  };
};

module.exports = verifyRoles;
