const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: "Please provide token" })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) return res.json({ auth: false, msg: "Invalid Token" });
            else {
                req.token = token;
                req.data = authData;
            }
        });

        next()

    } catch (e) {
        res.status(401).send({ error: 'Something went wrong, try refreshing the page and try again' })
    }
}

const verifyRole = (role) => {
    return (req, res, next) => {

        if (req.data.role !== role) {
            return res.status(401).json({ error: "You are not authorized to access this route" })
        }
        next()

    }
}

module.exports = { verifyToken, verifyRole };