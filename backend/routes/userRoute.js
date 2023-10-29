import express from 'express'
import { authUser, generateOTP, registerUser } from '../controller/userController.js'
import { registerMail } from '../controller/mailController.js'
import { getProducts } from '../controller/adminController.js'
import { protect } from '../middlewares/authmiddleware.js'
const router = express.Router()

router.route('/generateOtp').post(generateOTP, registerMail)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/products').get(protect, getProducts)


export default router