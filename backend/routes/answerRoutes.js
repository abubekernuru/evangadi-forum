// const express = require('express');
// const authenticate = require('../middleware/auth');
// const router = express.Router();

// // GET /api/answer/:question_id - Get answers for question
// router.get('/:question_id', (req, res) => {
//     try {
//         const questionId = req.params.question_id;
        
//         // TODO: Replace with real database data in Task 6
//         const answers = [
//             {
//                 answer_id: 1,
//                 content: "This is a sample answer for the question.",
//                 user_name: "Abebe",
//                 created_at: new Date().toISOString()
//             },
//             {
//                 answer_id: 2, 
//                 content: "Another helpful answer for this question.",
//                 user_name: "Almaz",
//                 created_at: new Date().toISOString()
//             }
//         ];
        
//         res.status(200).json({
//             answers: answers
//         });
//     } catch (error) {
//         console.error('❌ Get answers error:', error);
//         res.status(500).json({
//             error: "Internal Server Error",
//             message: "An unexpected error occurred."
//         });
//     }
// });

// // POST /api/answer - Post answer to question (protected)
// router.post('/', authenticate, (req, res) => {
//     try {
//         const { questionid, answer } = req.body;
        
//         // Validation
//         if (!answer) {
//             return res.status(400).json({
//                 error: "Bad Request",
//                 message: "Please provide answer"
//             });
//         }
        
//         if (!questionid) {
//             return res.status(400).json({
//                 error: "Bad Request", 
//                 message: "Please provide question ID"
//             });
//         }
        
//         // TODO: Save to database in Task 7
//         res.status(201).json({
//             message: "Answer posted successfully"
//         });
//     } catch (error) {
//         console.error('❌ Post answer error:', error);
//         res.status(500).json({
//             error: "Internal Server Error",
//             message: "An unexpected error occurred."
//         });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

// answer controllers
const { getAnswers, postAnswer } = require('../controller/answerController.js');

// GET /api/answer/:question_id - Get answers for question
router.get('/:question_id', authMiddleware, getAnswers);

// POST /api/answer - Post answer to question (protected)
router.post('/answerPost',authMiddleware, postAnswer);

module.exports = router;