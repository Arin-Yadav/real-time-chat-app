import express from 'express'
import { handleSignUp } from '../controllers/user.Controllers.js'

const router = express()

router.post("/create", handleSignUp)

export default router