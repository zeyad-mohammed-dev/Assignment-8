import { Router } from "express";   
import * as userServices from "./user.services.js";
import { auth } from "../../middlewares/auth.middleware.js";
const router = Router()

router.post('/signup' , userServices.signup )
router.post('/login' , userServices.login)
router.patch('/updateUser' , auth() , userServices.updateUser)
router.delete('/deleteUser',auth(), userServices.deleteUser)

export default router