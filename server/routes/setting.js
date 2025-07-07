import express from 'express';
import { changePassword } from '../controllers/settingController.js';

const router = express.Router();

// ✅ Remove auth middleware since we're sending userId manually
router.put('/change-password', changePassword);

export default router;
