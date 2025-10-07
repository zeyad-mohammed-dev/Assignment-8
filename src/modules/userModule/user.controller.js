import { Router } from "express";   
import * as userServices from "./user.services.js";
const router = Router()

router.post('/signup' , userServices.signup )
router.post('/login' , userServices.login)

export default router