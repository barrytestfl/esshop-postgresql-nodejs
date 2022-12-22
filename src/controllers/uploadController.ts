import multer, { diskStorage } from 'multer';
import * as fs from 'fs';
import path from 'path';
import express,{ Request, request, Response, Router } from "express";
import IController from "./../interfaces/IController";
import authMiddleware from './../middlewares/authMiddleware';


class UploadController implements IController{
    public path: string="/upload";
    public router: Router=express.Router();

    private upload = multer({ dest: 'uploads/'});
    private DIR = './uploads';
    private   storage :multer.StorageEngine;
    private uploadbyEntity :multer.Multer;
    
    constructor(){
          this.initializeRoutes();
    }

    public initializeRoutes(){
        this.storage=multer.diskStorage({
            destination: function (req, file, callback) {
              callback(null, 'uploads/');
            },
            filename: function (req:Request, file:Express.Multer.File, cb) {
              cb(null, (file.fieldname) + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        this.uploadbyEntity =multer({storage: this.storage});
        
        this.router.use(this.path,authMiddleware);
        this.router.post(`${this.path}/index`,this.uploadbyEntity.array('files'),this.index)
        this.router.post(`${this.path}/single`,this.upload.single('single'),this.single)
        this.router.post(`${this.path}/multiple`,this.upload.array('multiple'),this.multiple)
    }
    private index=async (request:Request,response:Response)=>{
        let message = "Error! in image upload."
        if (!request.files) {
             
            message = "Error! in image upload."
            response.status(500).send({message: message, status:'danger'});
        
          } else {
                      
            message = "Successfully! uploaded";
            response.send({message: message, status:'success', files:request.files,entity:request.body});
          }
         
        
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
  