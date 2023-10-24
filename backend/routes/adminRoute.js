import express from "express";
import { adminAuth } from "../controller/adminController.js";
const router = express.Router()


router.route('/login').post(adminAuth)

export default router