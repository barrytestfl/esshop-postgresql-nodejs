import express,{Router,Request,Response,NextFunction} from 'express';
import IController from './../interfaces/IController';
 import ValidationModel from './../middlewares/validationModelMiddleware';
import Attribute from './../entities/attribute.model';
import AttributeDTO from './../metadata_DTO/attributes.dto';
import AppDataSource from './../utils/ormcong';
import authMiddleware from './../middlewares/authMiddleware';

class AttributeController implements IController{
    public path: string="/attribute";
    public router: Router=express.Router();
    private attributeRepository=AppDataSource.getRepository(Attribute);
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
          
    this.router.use(this.path, authMiddleware);

        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(AttributeDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(AttributeDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.attributeRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeRepository.findBy({AttributeId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:AttributeDTO=request.body;
        const data=await this.attributeRepository.insert(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:AttributeDTO=request.body;
        const data=await this.attributeRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeRepository.delete({AttributeId:id});
        response.send(data);
    }
}
export default AttributeController;