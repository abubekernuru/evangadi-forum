const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbConnection = require('../config/db');
const authenticate = require('../middleware/auth');
const router = express.Router();

// POST /api/user/register - User Registration
router.post('/register', async (req, res) => {
    console.log('📝 Registration attempt:', req.body);
    
    try {
        const { username, first_name, last_name, email, password } = req.body;
        
        // Check if all fields are provided
        if (!username || !first_name || !last_name || !email || !password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Please provide all required fields"
            });
        }
        
        // Check password length
        if (password.length < 8) {
            return res.status(400).json({
                error: "Bad Request", 
                message: "Password must be at least 8 characters"
            });
        }
        
        // TODO: In Task 4, we'll add database check for existing users
        // For now, return success
        res.status(201).json({
            message: "User registered successfully"
        });
        
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
});

// POST /api/user/login - User Login
router.post('/login', async (req, res) => {
    console.log('🔑 Login attempt - Full request:', {
        headers: req.headers,
        body: req.body
    });
    console.log('🔑 Login attempt:', req.body);
    
    try {
        const { email, password } = req.body;
        
        // Check if fields are provided
        if (!email || !password) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Please provide all required fields"
            });
        }
        
        // TODO: In Task 5, we'll add real database verification
        // For now, create mock user and token
        const mockUser = {
            id: "123",
            username: "Kebede",
            email: email
        };
        
        // Create JWT token (expires in 24 hours)
        const token = jwt.sign(
            { 
                userid: mockUser.id, 
                username: mockUser.username,
                email: mockUser.email 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(200).json({
            message: "User login successful",
            token: token
        });
        
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
});

// GET /api/user/checkUser - Check User Authentication
router.get('/checkUser', authenticate, (req, res) => {
    console.log('✅ User is authenticated:', req.user);
    
    res.status(200).json({
        message: "Valid user",
        username: req.user.username,
        userid: req.user.userid
    });
});

module.exports = router;