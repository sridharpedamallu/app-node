const express = require('express')
const router = express.Router()

const user = require('../controllers/user.controller')
// const auth = require('../middleware/auth')

router.post('/sign-up', user.signUp)
router.post('/sign-in', user.signIn)
router.post('/get-user', user.getUser)
router.post('/update-user/:id', user.updateUser)
router.post('/change-password', user.changePassword)
router.post('/signup-otp', user.signUpOTP)

module.exports = router