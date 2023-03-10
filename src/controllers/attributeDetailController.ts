import express,{Request,Response,NextFunction} from 'express';
import AttributeDetail from '../entities/attributeDetail.model';
import AttributeDetailDTO from '../metadata_DTO/attributeDetails.dto';
import AppDataSource from '../utils/ormcong';
import authMiddleware from '../middlewares/authMiddleware';
import ValidationModel from '../middlewares/validationModelMiddleware';
import IController from '../interfaces/IController';

class AttributeDetailController implements IController{
    public path: string="/attributedetail";
    public router: express.Router=express.Router();
    private attributeDetailRepository=AppDataSource.getRepository(AttributeDetail);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use(this.path, authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(AttributeDetailDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(AttributeDetailDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.attributeDetailRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeDetailRepository.findBy({AttributeId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:AttributeDetailDTO=request.body;
        const curData=await this.attributeDetailRepository.findOneBy({ProductId:model.ProductId,AttributeId:model.AttributeId});
        if(curData==null){
        const data=await this.attributeDetailRepository.insert(model);
        response.send(data);
        }
        else{
            response.status(500).send({curData,error:'this attribute has value .one product singeltext type cant have mor than one attribute'});
        }
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:AttributeDetailDTO=request.body;
        const data=await this.attributeDetailRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.attributeDetailRepository.delete({AttributeDetailId:id});
        response.send(data);
    }
}
export default AttributeDetailController;