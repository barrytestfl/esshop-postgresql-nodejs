import express,{Request,Response,NextFunction} from 'express';
import AttributeValue from '../entities/attributeValue.model';
import AttributeValuesDTO from '../metadata_DTO/attributeValues.dto';
import AppDataSource from '../utils/ormcong';
import authMiddleware from '../middlewares/authMiddleware';
import ValidationModel from '../middlewares/validationModelMiddleware';
import IController from '../interfaces/IController';

class AttributeValueController implements IController{
    public path: string="/attributevalue";
    public router: express.Router=express.Router();
    private attributeValueRepository=AppDataSource.getRepository(AttributeValue);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use(this.path, authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(AttributeValuesDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(AttributeValuesDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.attributeValueRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeValueRepository.findBy({AttrbuteId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:AttributeValuesDTO=request.body;
        const data=await this.attributeValueRepository.insert(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:AttributeValuesDTO=request.body;
        const data=await this.attributeValueRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeValueRepository.delete({AttributeValueId:id});
        response.send(data);
    }
}
export default AttributeValueController;