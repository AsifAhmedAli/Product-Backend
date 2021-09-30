const jwt = require('jsonwebtoken');

const verifyToken = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');

            if (!token) {
                return res.status(401).json({ error: "Please provide token" })
            }

            if (typeof roles === 'string') {
                roles = [roles];
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
                if (err) return res.json({ auth: false, msg: "Invalid Token" });
                else {
                    req.token = token;
                    req.data = authData;
                }
            });

            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            next()

        } catch (e) {
            res.status(401).send({ error: 'Authentication problem!!' })
        }
    }
};

module.exports = verifyToken;