import express from "express";
import { UpdateUser, adminAuth, getUsers, searchUser } from "../controller/adminController.js";
const router = express.Router()


router.route('/login').post(adminAuth);
router.route('/userdata').get(getUsers);
router.route('/updateuser/:id').post(UpdateUser);
router.route('/searchuser').post(searchUser);

export default router