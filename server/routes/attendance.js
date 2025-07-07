import express from 'express'
import { attendanceReport, getAttendance, updateAttendance } from '../controllers/attendanceController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import defaultAttendence from '../middleware/defaultAttendance.js'

const router = express. Router()

router.get('/', authMiddleware, defaultAttendence, getAttendance)
router.put('/update/:employeeId', authMiddleware, updateAttendance)
router.get('/report', authMiddleware, attendanceReport)

export default router;