import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { TokenDetails } from "../models/user.model";

export interface extendedRequest extends Request{
    headers: any;
    info?: TokenDetails
}

export const verifyToken = async(req:extendedRequest, res:Response, next:NextFunction) =>{

    try {
        const token = req.headers['token'] as string;

        if(!token){
            return res.status(401).json({
                error: "You do not have access"
            })
        }else{
            let data = jwt.verify(token, process.env.SECRET_KEY as string) as TokenDetails

            req.info = data
        }
    } catch (error) {
        return res.json({
            error
        })
    }

    next()
}

