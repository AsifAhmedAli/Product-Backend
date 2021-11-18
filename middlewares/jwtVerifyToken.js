const jwt = require('jsonwebtoken');

const { TokenExpiredError } = jwt;

const verifyToken = async (req, res, next) => {
    try {
        const cookieToken = req.cookies.jwt_tokens;

        if (!cookieToken || !cookieToken.token) {
            return res.status(401).json({ error: "please login first" })
        }

        try {
            let token = cookieToken.token;

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

        } catch (error) {
            return res.status(401).json({ error: "Unauthorized" })
        }


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