import express,{ Request, request, Response, Router } from "express";
import IController from "interfaces/IController";
import AppDataSource  from '../utils/ormcong'
import Attribute from './../entities/attribute.model';

class HomeController implements IController{
    public path: string="/";
    public router: Router=express.Router();
    private attributeRepository=AppDataSource.getRepository(Attribute);
    constructor(){
            this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path,this.index)
    }
    private index=async (request:Request,response:Response)=>{
        let data=await this.attributeRepository.find();
        response.send({data:"hi"});
    }
}
export default HomeController;