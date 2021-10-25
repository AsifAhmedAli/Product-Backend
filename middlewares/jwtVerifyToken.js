const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (token) {
            token = token.replace('Bearer ', '');
        } else {
            return res.status(401).json({ error: "Please provide token" })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err instanceof TokenExpiredError) {
                    return res.status(401).json({ error: "Token expired" })
                }
                return res.status(401).json({ error: "Invalid token" })
            }
            req.user = decoded;
            next();
        })


    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

const verifyRole = (role) => {
    return (req, res, next) => {

        if (req.user.role !== role) {
            return res.status(401).json({ error: "You are not authorized to access this route" })
        }
        next()

    }
}

module.exports = { verifyToken, verifyRole };