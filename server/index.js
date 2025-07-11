import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';          // ✅ Import dotenv
dotenv.config();                      // ✅ Load .env file

import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectToDatabase from './db/db.js';
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import SettingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import attendanceRouter from './routes/attendance.js'

connectToDatabase(); // ✅ Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', SettingRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/dashboard', dashboardRouter)


// ✅ Start server using port from .env
app.listen(process.env.PORT, () => {
    console.log(`✅ Server is running on port ${process.env.PORT}`);
});
