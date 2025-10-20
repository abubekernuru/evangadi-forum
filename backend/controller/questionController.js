const { StatusCodes } = require('http-status-codes')
const dbConnection = require('../config/db')

require('dotenv').config();

async function getAllQuestions(req, res) {
    try {
        const [questions] = await dbConnection.query(
            `SELECT q.id AS question_id, q.title, q.description, q.created_at, q.user_id, u.username
             FROM questions q
             JOIN users u ON q.user_id = u.id
             ORDER BY q.created_at DESC`
        );
        return res.status(StatusCodes.OK).json({ questions });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error });
    }
}

async function getSingleQuestion(req, res) {
    const { question_id } = req.params;
    if (!question_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Question id is required" });
    }
    try {
        const [rows] = await dbConnection.query(
            `SELECT q.id AS question_id, q.title, q.description, q.created_at, q.user_id, u.username
             FROM questions q
             JOIN users u ON q.user_id = u.id
             WHERE q.id = ?`, [question_id]
        );
        if (rows.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Question not found" });
        }
        return res.status(StatusCodes.OK).json({ question: rows[0] });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error });
    }
}

async function postQuestion(req, res) {
    const { title, description } = req.body;
    const user_id = req.user && req.user.id;
    if (!user_id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized" });
    }
    if (!title || !description) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Title and description are required" });
    }
    try {
        const [result] = await dbConnection.query(
            "INSERT INTO questions (title, description, user_id) VALUES (?, ?, ?)",
            [title, description, user_id]
        );
        return res.status(StatusCodes.CREATED).json({ msg: "Question posted successfully", question_id: result.insertId });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later!", error });
    }
}

module.exports = { getAllQuestions, getSingleQuestion, postQuestion };