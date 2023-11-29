import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createConnection, getChatHistory, getConnections } from '../controller/chatController.js'
const router = express.Router()

router.route('/connections').get(protect, getConnections);
router.route('/createConnection').post(protect, createConnection);
router.route('/history/:id').get(protect, getChatHistory)

export default router