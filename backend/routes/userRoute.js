import express from 'express'
import { AddToCart, addAddress, authUser, generateOTP, getCartItems, getUserAddress, registerUser, removeAddress, removeCartItem, test, 
    updateCartQty, updateCartQtyDec } from '../controller/userController.js'
import { registerMail } from '../controller/mailController.js'
import { getProducts } from '../controller/adminController.js'
import { protect } from '../middlewares/authmiddleware.js'
import { placeOrder } from '../controller/orderController.js'

const router = express.Router()

router.route('/generateOtp').post(generateOTP, registerMail)
router.route('/register').post(registerUser)
router.route('/login').post(authUser)

router.route('/products').get(getProducts)
router.route('/viewproduct/:id').get(getProducts)

router.route('/addtocart').post(protect, AddToCart)
router.route('/getCartItems').get(protect, getCartItems)
router.route('/incqty/:id').post(protect,updateCartQty)
router.route('/decqty/:id').post(protect,updateCartQtyDec)
router.route('/test/:id').get(protect, test)
router.route('/removeCartItem/:id').post(protect, removeCartItem)

router.route('/addAddress').post(protect, addAddress)
router.route('/getUserAddress').get(protect, getUserAddress)
router.route('/removeAddress/:id').get(protect, removeAddress)

router.route('/placeOrder').post(protect, placeOrder)



export default router