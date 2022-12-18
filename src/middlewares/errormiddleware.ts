
import {Request,Response,NextFunction } from 'express';
import HttpException from 'exceptions/HttpException'
 
export default function errormiddleware(error:HttpException,request:Request,response:Response,next:NextFunction){
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
        response.status(status).send({status,message,})
}
 