import express from "express";
import { UpdateUser, adminAuth, getUsers, searchUser, addProduct, getProducts, editProduct } from "../controller/adminController.js";
import { protect } from "../middlewares/authmiddleware.js";
const router = express.Router()


router.route('/login').post(adminAuth);
router.route('/userdata').get(protect, getUsers);
router.route('/updateuser/:id').post(UpdateUser);
router.route('/searchuser').post(searchUser);
router.route('/addproducts').post(addProduct)
router.route('/products/:id').get(getProducts)
router.route('/editproduct/:id').post(editProduct)
router.route('/products').get(getProducts)

export default router