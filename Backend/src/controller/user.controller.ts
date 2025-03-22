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

    async loginUser(req: Request, res: Response) {
        try {
            let { email, password } = req.body

            let response = await service.login(req.body)

            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}