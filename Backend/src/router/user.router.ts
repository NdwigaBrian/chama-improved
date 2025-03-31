import {Router} from "express";
import{ userController } from "../controller/user.controller";

let controller = new userController()

let user_router = Router()

user_router.post('/create', controller.createUser.bind(controller))
user_router.get('/all-users', controller.fetchAll)
user_router.get('/:user_id', controller.fetchSingleUser)
user_router.post('/login', controller.loginUser ) // Add the loginUser route

export default user_router