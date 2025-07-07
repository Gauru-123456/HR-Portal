import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController.js';

const router = express.Router();

router.get('/', authMiddleware, getDepartments);              
router.post('/add', authMiddleware, addDepartment);            
router.put('/edit/:id', authMiddleware, updateDepartment);     
router.get('/:id', authMiddleware, getDepartment);     
router.delete('/:id', authMiddleware, deleteDepartment);         

export default router;
