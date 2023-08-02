import express from 'express'
const router = express.Router()

import { registerUser, loginUser, isUserLogged, logout } from '../controllers/usersController.js'
import {authanticate} from '../middleware/authMiddleware.js'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/isuser', authanticate ,isUserLogged)
router.delete('/logout', logout)

export default router
