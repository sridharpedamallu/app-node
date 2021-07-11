const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')
// const auth = require('../middleware/auth')

router.post('/sign-up', user.signUp)
// router.post('/sign-in', user.signIn)

module.exports = router