import express,{ Request, request, Response, Router } from "express";
import IController from "interfaces/IController";

class HomeController implements IController{
    public path: string="/";
    public router: Router=express.Router();

    constructor(){
            this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path,this.index)
    }
    private index=(request:Request,response:Response)=>{
                response.send({message:"Hi Postgresql RestAPI By ExpresJS"});
    }
}
export default HomeController;