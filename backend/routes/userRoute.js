import express from 'express'
import { authUser, generateOTP, registerUser } from '../controller/userController.js'
import { registerMail } from '../controller/mailController.js'
import { getCategories, getProducts } from '../controller/adminController.js'

const router = express.Router()

router.route('/generateOtp').post(generateOTP, registerMail)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)
router.route('/products').get(getProducts)
router.route('/viewproduct/:id').get(getProducts)




export default router