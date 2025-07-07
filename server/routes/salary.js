import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary, getSalary, upload } from '../controllers/salaryController.js';

const router = express.Router();

// ✅ For handling formData without file upload
router.post('/add', authMiddleware, upload.none(), addSalary);

// ✅ For fetching salary by employee ID
router.get('/:id/:role', authMiddleware, getSalary);

export default router;
