import multer from 'multer';
import * as fs from 'fs';
import express,{ Request, request, Response, Router } from "express";
import IController from "./../interfaces/IController";
import authMiddleware from './../middlewares/authMiddleware';


class UploadController implements IController{
    public path: string="/upload";
    public router: Router=express.Router();
    private upload = multer({ dest: 'uploads/'});
    constructor(){
            this.initializeRoutes();
             
    }

    public initializeRoutes(){
        this.router.use(this.path,authMiddleware);
        this.router.post(`${this.path}`,this.upload.none,this.index)
        this.router.post(`${this.path}/single`,this.upload.single('file'),this.single)
        this.router.post(`${this.path}/multiple`,this.upload.array('files'),this.multiple)
    }
    private index=async (request:Request,response:Response)=>{
        console.log('uploads')
        response.send({files:request.files,form:request.body});
    }
    private single=async (request:Request,response:Response)=>{
        console.log(request.file);
        //response.send(request.body);
        response.send({file:request.file,data:request.body});
    }
    
    private multiple=async (request:Request,response:Response)=>{
        console.log(request.files)
        response.send(request.body);
    }
}
export default UploadController;
  