import express,{Request,Response,NextFunction} from 'express';
import Product from 'entities/product.model';
import ProductDTO from 'metadata_DTO/products.dto';
import AppDataSource from 'utils/ormcong';
import authMiddleware from 'middlewares/authMiddleware';
import ValidationModel from 'middlewares/validationModelMiddleware';
import IController from 'interfaces/IController';

class ProductController implements IController{
    public path: string="Product";
    public router: express.Router=express.Router();
    private productRepository=AppDataSource.getRepository(Product);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use('/', authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(ProductDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(ProductDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.productRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.productRepository.findBy({ProductId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:ProductDTO=request.body;
        const data=await this.productRepository.create(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:ProductDTO=request.body;
        const data=await this.productRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.productRepository.delete({ProductId:id});
        response.send(data);
    }
}
export default ProductController;