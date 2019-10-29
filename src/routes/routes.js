const router = require('express').Router()

// MIDDLEWARE's
const isAuth = require('../middlewares/isAuth')

// MODEL's
const User = require('../models/User')

// CONTROLLER's
const UserController = require('../controllers/UserController')

router.post('/signup', UserController.store)
router.post('/login', UserController.login)

router.get('/getUser', (isAuth), async (req, res, next) => {
    const user = await User.findById(req.userId, ['-__v'])
    if (!user) {
        return res.json({ error: "User does not exist." })
    }

    next()
    return res.json({ user })
})

module.exports = router