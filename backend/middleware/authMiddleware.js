const jwt = require('jsonwebtoken');
const {StatusCodes} =  require('http-status-codes');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader  || !authHeader.startsWith('Bearer ')) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Authentication Invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { username, id } = jwt.verify(token, "secret");
        req.user = { username, id };
        next();
    } catch (error) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Authentication Invalid' });
    }
}

module.exports = authMiddleware;

