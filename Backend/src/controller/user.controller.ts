import { Request, Response } from "express";
import { userService } from "../services/user.service";


let service = new userService()

export class userController {

    async createUser(req: Request, res: Response) {
        try {

            let { name, email, phone_number, password } = req.body

     

            let result = await service.registerUser(req.body)

            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async fetchAll(req: Request, res: Response) {
        try {
            let result = await service.fetchAllUsers()

            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async fetchSingleUser(req:Request, res:Response){
        try {
            let {user_id} = req.params

            let response = await service.fetchSingleUser(user_id)
            
            return res.json(response)

        } catch (error) {
            return res.json({
                error
            })
        }
    }

    async switchRoles(req:Request, res:Response){
        try {
            let {user_id} = req.body

            let response = await service.switchRoles(user_id)

            return res.json(response)
        } catch (error) {
            return res.json({
                error
            })
        }
    }

}