import express from 'express'
import { authUser, generateOTP, registerUser } from '../controller/userController.js'
import { registerMail } from '../controller/mailController.js'
const router = express.Router()

router.route('/generateOtp').post(generateOTP, registerMail)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)


export default router