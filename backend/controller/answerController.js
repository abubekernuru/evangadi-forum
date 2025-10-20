const { StatusCodes } = require('http-status-codes');
const dbConnection = require('../config/db');

// function getAnswers(req, res){
//     res.send("get answers")
// }

// function postAnswer(req, res){
//     res.send("post answers")
// }

// module.exports = { getAnswers, postAnswer }



require('dotenv').config();

async function getAnswers(req, res) {
    const { question_id } = req.params;
    if (!question_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Question id is required" });
    }
    try {
        const [answers] = await dbConnection.query(
            `SELECT a.id AS answer_id, a.answer, a.created_at, a.user_id, u.username
             FROM answers a
             JOIN users u ON a.user_id = u.id
             WHERE a.question_id = ?
             ORDER BY a.created_at DESC`,
            [question_id]
        );
        return res.status(StatusCodes.OK).json({ answers });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error });
    }
}

async function postAnswer(req, res) {
    const { question_id, answer } = req.body;
    const user_id = req.user && req.user.id;
    if (!user_id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
    if (!question_id || !answer) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Question id and answer are required" });
    }
    try {
        const [qrows] = await dbConnection.query("SELECT id FROM questions WHERE id = ?", [question_id]);
        if (qrows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
        }
        const [result] = await dbConnection.query(
            "INSERT INTO answers (answer, user_id, question_id) VALUES (?, ?, ?)",
            [answer, user_id, question_id]
        );
        return res.status(StatusCodes.CREATED).json({ msg: "Answer posted successfully", answer_id: result.insertId });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error });
    }
}

module.exports = { getAnswers, postAnswer };