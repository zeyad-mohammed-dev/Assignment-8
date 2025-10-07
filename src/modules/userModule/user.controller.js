import { Router } from "express";   
import * as userServices from "./user.services.js";
const router = Router()

router.post('/signup' , userServices.signup )

export default router