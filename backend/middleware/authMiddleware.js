const jwt = require('jsonwebtoken');
const {StatusCodes} =  require('http-status-codes');
require('dotenv').config();

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader  || !authHeader.startsWith('Bearer ')) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Authentication Invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { username, id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username, id };
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Authentication Invalid' });
    }
}

module.exports = authMiddleware;

