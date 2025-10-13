const express = require('express');
const authenticate = require('../middleware/auth');
const router = express.Router();

// GET /api/question - Get all questions
router.get('/', (req, res) => {
    try {
        // TODO: Replace with real database data in Task 8
        const questions = [
            {
                question_id: 1,
                title: "How to center a div in CSS?",
                content: "I'm having trouble centering a div both horizontally and vertically.",
                user_name: "Sisay",
                created_at: new Date().toISOString()
            },
            {
                question_id: 2,
                title: "React useState not updating",
                content: "My React component state is not updating when I use useState hook.",
                user_name: "Sara", 
                created_at: new Date().toISOString()
            }
        ];
        
        res.status(200).json({
            questions: questions
        });
    } catch (error) {
        console.error('❌ Get questions error:', error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
});

// GET /api/question/:question_id - Get single question
router.get('/:question_id', (req, res) => {
    try {
        const questionId = req.params.question_id;
        
        // TODO: Replace with real database data in Task 9
        const question = {
            question_id: parseInt(questionId),
            title: "Sample Question Title",
            content: "This is a sample question description.",
            user_id: 123,
            created_at: new Date().toISOString()
        };
        
        res.status(200).json({
            question: question
        });
    } catch (error) {
        console.error('❌ Get question error:', error);
        res.status(500).json({
            error: "Internal Server Error", 
            message: "An unexpected error occurred."
        });
    }
});

// POST /api/question - Create new question (protected)
router.post('/', authenticate, (req, res) => {
    try {
        const { title, description } = req.body;
        
        // Validation
        if (!title || !description) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Please provide all required fields"
            });
        }
        
        // TODO: Save to database in Task 10
        res.status(201).json({
            message: "Question created successfully"
        });
    } catch (error) {
        console.error('❌ Create question error:', error);
        res.status(500).json({
            error: "Internal Server Error",
            message: "An unexpected error occurred."
        });
    }
});

module.exports = router;