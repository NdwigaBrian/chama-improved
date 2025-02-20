import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

let controller = new authController()
let auth_router = Router()

auth_router.post('/login', controller.loginUser)
auth_router.get('/check-details', verifyToken, controller.checkDetails)

export default auth_router