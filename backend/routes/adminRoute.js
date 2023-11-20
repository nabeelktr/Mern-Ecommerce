import express from "express";
import { UpdateUser, adminAuth, getUsers, searchUser, addProduct, getProducts, editProduct, deleteProduct, editProductFirebase, addCategory, getCategories, deleteCategory, editCategory, summary, addCoupon, getCoupon, getUserCoupon, summaryFilter } from "../controller/adminController.js";
import { protect } from "../middlewares/authmiddleware.js";
import { changeOrderStatus, getUserOrder, salesReport } from "../controller/orderController.js";
const router = express.Router()


router.route('/login').post(adminAuth);
router.route('/userdata').get(protect, getUsers);
router.route('/updateuser/:id').post(UpdateUser);
router.route('/searchuser').post(protect, searchUser);

router.route('/addproducts').post(addProduct)
router.route('/products/:id').get(getProducts)
router.route('/deleteproduct/:id').get(deleteProduct)
router.route('/editproduct/:id').post(editProduct)
router.route('/products').get(protect, getProducts)
router.route('/deletefromfirebase/:id').post(editProductFirebase)

router.route('/categories').get(getCategories)
router.route('/addcategory').post(addCategory);
router.route('/deletecategory/:id').get(deleteCategory);
router.route('/category/:id').get(getCategories);
router.route('/editcategory/:id').post(editCategory);

router.route('/orderStatus').post(protect, changeOrderStatus);
router.route('/summary').get(protect, summary);
router.route('/salesreport').post(protect, salesReport);
router.route('/dashboardfilter').post(protect, summaryFilter);
router.route('/getuserorder/:id').get(protect, getUserOrder);

router.route('/addCoupon').post(protect, addCoupon);
router.route('/coupons').get(protect, getCoupon);
router.route('/userCoupons').get(protect, getUserCoupon);





export default router