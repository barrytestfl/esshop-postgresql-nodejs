import express,{Request,Response,NextFunction} from 'express';
import User from '../entities/user.model';
import UserDTO from '../metadata_DTO/user.dto';
import AppDataSource from '../utils/ormcong';
import authMiddleware from '../middlewares/authMiddleware';
import ValidationModel from '../middlewares/validationModelMiddleware';
import IController from '../interfaces/IController';

class UserController implements IController{
    public path: string="/user";
    public router: express.Router=express.Router();
    private userRepository=AppDataSource.getRepository(User);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use(this.path, authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(UserDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(UserDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.userRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.userRepository.findBy({Id:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:UserDTO=request.body;
        const data=await this.userRepository.insert(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:UserDTO=request.body;
        const data=await this.userRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.userRepository.delete({Id:id});
        response.send(data);
    }
}
export default UserController;