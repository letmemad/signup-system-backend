const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: "1y"
    })
}

module.exports = {
    async store(req, res) {
        const { username, email, password } = req.body;
        if (await User.findOne({ email })) {
            return res.json({ error: "Email alredy exists." })
        }

        const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 12)
        })

        return res.json({ user, token: generateToken({ userId: user._id }) })
    },

    async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ error: "Email does not exist." })
        }

        const pass = await bcrypt.compare(password, user.password)
        if (!pass) {
            return res.json({ error: "Email or Password are invalid." })
        }

        return res.json({ user, token: generateToken({ userId: user._id }) })
    },
}