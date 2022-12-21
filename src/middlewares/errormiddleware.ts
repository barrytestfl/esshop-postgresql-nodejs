
import {Request,Response,NextFunction } from 'express';
import HttpException from '../exceptions/HttpException'
 
function errormiddleware(error:HttpException,request:Request,response:Response,next:NextFunction){
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.log('message middleware',message)
    console.log('request.body middleware',request.body,request.file)
        response.status(status).send({status,message,})
}
export default errormiddleware;