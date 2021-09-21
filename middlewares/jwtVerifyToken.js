const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: "Please provide token" })
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
            if (err) res.json({ auth: false, msg: "You are not authenticated, try logging in again" });
            else {
                req.token = token;
                req.data = authData;
            }
        });

        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication problem!!' })
    }
};

module.exports = verifyToken;