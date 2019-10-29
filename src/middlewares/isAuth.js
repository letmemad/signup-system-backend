const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization')
    jwt.verify(token, process.env.SECRET, (err, dec) => {
        if (err) {
            return res.json({ error: "Token invalid!" })
        }

        req.userId = dec.userId
        next()
    })
}