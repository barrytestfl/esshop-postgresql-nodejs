import express,{Request,Response,NextFunction} from 'express';
import Group from 'entities/group.model';
import GroupDTO from 'metadata_DTO/groups.dto';
import AppDataSource from 'utils/ormcong';
import authMiddleware from 'middlewares/authMiddleware';
import ValidationModel from 'middlewares/validationModelMiddleware';
import IController from 'interfaces/IController';

class GroupController implements IController{
    public path: string="Group";
    public router: express.Router=express.Router();
    private groupRepository=AppDataSource.getRepository(Group);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use('/', authMiddleware);
        this.router
        .get(this.path,this.getAll)
        .get(`${this.path}/:id`,this.getById)
        .post(this.path,ValidationModel(GroupDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(GroupDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete)
    }
    private getAll=async(request:Request,response:Response)=>{
        
        const data=await this.groupRepository.find();
        response.send(data);
    }
    private getById=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.groupRepository.findBy({GroupId:id});
        response.send(data);
    }
    private create=async(request:Request,response:Response)=>{
        const model:GroupDTO=request.body;
        const data=await this.groupRepository.create(model);
        response.send(data);
    }
    private update=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const model:GroupDTO=request.body;
        const data=await this.groupRepository.update(id,model);
        response.send(data);
    }
    private delete=async(request:Request,response:Response)=>{
        const id=Number(request.params.id);
        const data=await this.groupRepository.delete({GroupId:id});
        response.send(data);
    }
}
export default GroupController;