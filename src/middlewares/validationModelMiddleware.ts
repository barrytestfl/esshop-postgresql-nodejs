import {plainToInstance } from 'class-transformer';
import {validate,ValidationError} from 'class-validator';
import express,{ Request, Response, NextFunction } from 'express';
import HttpException from './../exceptions/HttpException';

function ValidationModel(type: any, skipMissingProperties:boolean = false):express.RequestHandler {
return(req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log('req.body',req.body)
    const objectModel=plainToInstance(type, req.body );
    validate(objectModel,{skipMissingProperties})
    .then((errors:ValidationError[])=>{
        if (errors.length>0){
         const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints||[])).join(', ');
          console.log('message',message)
          next(new HttpException(400, message));
        }else{
            req.body ={...objectModel};
            next();
        }
    })
}
}
export default ValidationModel;