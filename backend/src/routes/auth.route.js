import express from 'express'
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js'
import { protect } from '../middleware/profile.middle.js'

const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/profileUpdated", protect, updateProfile)

export default router