import express,{Request,Response,NextFunction} from 'express';
import Brand from '../entities/brand.model';
import BrandDTO from '../metadata_DTO/brands.dto';
import AppDataSource from '../utils/ormcong';
import authMiddleware from '../middlewares/authMiddleware';
import ValidationModel from '../middlewares/validationModelMiddleware';
import IController from '../interfaces/IController';

class BrandController implements IController{
    public path: string="/brand";
    public router: express.Router=express.Router();
    private brandRepository=AppDataSource.getRepository(Brand);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use(this.path, authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(BrandDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(BrandDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.brandRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.brandRepository.findBy({BrandId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:BrandDTO=request.body;
        const data=await this.brandRepository.insert(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:BrandDTO=request.body;
        const data=await this.brandRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.brandRepository.delete({BrandId:id});
        response.send(data);
    }
}
export default BrandController;