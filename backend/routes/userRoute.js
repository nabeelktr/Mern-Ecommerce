import express from 'express'
import { AddToCart, addAddress, addToWishlist, authUser, editAddress, editUser, generateOTP, getCartItems, getUser, getUserAddress, logout, registerUser, removeAddress, removeCartItem, test, 
    updateCartQty, updateCartQtyDec, updatePassword } from '../controller/userController.js'
import { registerMail } from '../controller/mailController.js'
import { getProducts } from '../controller/adminController.js'
import { protect, protectRefreshToken } from '../middlewares/authmiddleware.js'
import { checkCoupon, checkout, getOrders, getUserOrders, paymentVerification, placeOrder } from '../controller/orderController.js'

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
router.route('/editAddress').post(protect, editAddress)
router.route('/getUserAddress').get(protect, getUserAddress)
router.route('/removeAddress/:id').get(protect, removeAddress)

router.route('/placeOrder').post(protect, placeOrder)
router.route('/orders').get(protect, getOrders)
router.route('/userOrders').get(protect, getUserOrders);
router.route('/checkout').post(protect, checkout);
router.route('/paymentverification').post(protect, paymentVerification);

router.route('/getUser').get(protect, getUser)
router.route('/editUser').post(protect, editUser)
router.route('/resetPassword').post(protect, updatePassword);

router.route('/checkcoupon').post(protect, checkCoupon);
router.route('/addtowishlist').post(protect, addToWishlist)

router.route('/refresh').get(protectRefreshToken);
router.route('/logout').get(logout);



export default router