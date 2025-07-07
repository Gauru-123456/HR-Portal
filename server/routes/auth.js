/*import express from 'express'
import { login } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login )

export default router;*/

// server/routes/auth.js

import express from 'express';
import { login, verify } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js'
//import { verify } from 'jsonwebtoken';

const router = express.Router();

// ✅ Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

// Your existing login route
router.post('/login', login);
router.get('/verify', authMiddleware, verify)  //see authMiddleware.js file

export default router;
