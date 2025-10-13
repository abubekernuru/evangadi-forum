const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication Middleware - matches /api/user/checkUser
const authenticate = (req, res, next) => {
    console.log('🔐 Authentication Middleware Checking...');
    
    // Get token from header
    const authHeader = req.header('Authorization');
    
    // Check if token exists
    if (!authHeader) {
        console.log('❌ No token provided');
        return res.status(401).json({
            error: "Unauthorized",
            message: "Authentication invalid"
        });
    }
    
    // Check if token format is correct: "Bearer <token>"
    if (!authHeader.startsWith('Bearer ')) {
        console.log('❌ Invalid token format');
        return res.status(401).json({
            error: "Unauthorized", 
            message: "Authentication invalid"
        });
    }
    
    // Extract token from "Bearer <token>"
    const token = authHeader.substring(7);
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user information to the request object
        req.user = decoded;
        
        console.log('✅ Token verified for user:', decoded.username);
        next(); // Pass to next middleware/route
    } catch (error) {
        console.log('❌ Token verification failed:', error.message);
        return res.status(401).json({
            error: "Unauthorized",
            message: "Authentication invalid"
        });
    }
};

module.exports = authenticate;