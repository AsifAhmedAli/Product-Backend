const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
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


    } catch (e) {
        res.status(401).json({ error: 'Something went wrong, try refreshing the page and try again' })
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