import { Request, Response } from "express";
import { userService } from "../services/user.service";


let service = new userService()

export class userController {
    fetchSingleUser(arg0: string, fetchSingleUser: any) {
        throw new Error("Method not implemented.");
    }
    loginUser(arg0: string, loginUser: any) {
        throw new Error("Method not implemented.");
    }
    switchRoles(arg0: string, switchRoles: any) {
        throw new Error("Method not implemented.");
    }
    fetchAll(arg0: string, fetchAll: any) {
        throw new Error("Method not implemented.");
    }

    async createUser(req: Request, res: Response) {
        try {

            let { username, password } = req.body
            
            let result = await service.registerUser(req.body)

            return res.status(201).json(result)

        } catch (error) {
            return res.json({
                error
            })
        }
    }
}