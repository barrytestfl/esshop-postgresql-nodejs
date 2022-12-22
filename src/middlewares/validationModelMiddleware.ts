import {plainToClass, plainToInstance,ClassConstructor,ClassTransformOptions, Type } from 'class-transformer';
import {validate,ValidationError} from 'class-validator';
import express,{ Request, Response, NextFunction,RequestHandler } from 'express';
import HttpException from './../exceptions/HttpException';
import AttributeDTO from './../metadata_DTO/attributes.dto';

function identity<Type>(arg: Type): Type {
    return arg;
  }
function ValidationModel(ContentType:any , skipMissingProperties:boolean = false):RequestHandler {
return(req:Request, res:Response, next:NextFunction)=>{
    
      let  dto_type={...req.body};
      
      const objectModel=plainToInstance(ContentType ,dto_type) ;
    
    validate(objectModel as object,{skipMissingProperties:skipMissingProperties})
    .then((errors:ValidationError[])=>{
        if (errors.length>0){
         const message = errors.map((error: ValidationError) =>
          Object.values(error.constraints||[])).join(', ');
          console.log('message',message)
          next(new HttpException(400, message));
        }else{
            req.body ={...objectModel};
          //  next(new HttpException(400, 'objectModel'));
          next();
        }
    })
}
}
export function ValidationModel1(cls: any, skipMissingProperties:boolean = false): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Map to class
        let obj: object = plainToInstance(cls, req.body);

        // Validate class
        let errors = await validate(obj, {
            skipMissingProperties: true,
            whitelist: true,
            forbidNonWhitelisted: false,
            forbidUnknownValues: true,
        });
        if (errors.length > 0) {
            res.status(400).send({ error: true, errors: formatValidationErrors(errors) });
            return;
        }

        // Set validated class to locals
        res.locals.input = obj;
        next();
    };
}
interface ValidationErrorLog {
    property: string;
    constraints?: { [type: string]: string };
    children?: ValidationErrorLog[];
}

function formatValidationErrors(errors: ValidationError[]): ValidationErrorLog[] {
    return errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
        //children: error.children?.length > 0 ? formatValidationErrors(error.children) : undefined,
    }));
}
export default ValidationModel;