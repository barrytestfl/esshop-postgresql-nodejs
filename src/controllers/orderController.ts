import express,{Request,Response,NextFunction}  from 'express';
import IController from '../interfaces/IController';
import AppDataSource from 'utils/ormcong';
import Order from '../entities/order.model';
import OrderItem from '../entities/orderItem.model';
import OrderDTO from '../metadata_DTO/orders.dto';
import OrderItemDTO from '../metadata_DTO/orderItems.dto';
import authMiddleware from '../middlewares/authMiddleware';
import ValidationModel from '../middlewares/validationModelMiddleware';

class OrderController implements IController{
    public path: string='/order';
    public router: express.Router=express.Router();
    private orderRepository=AppDataSource.getRepository(Order);
    private orderItemRepository=AppDataSource.getRepository(OrderItem);
    constructor(){
        this.initializeController();
    }
    private initializeController(){
        this.router.use(this.path,authMiddleware);
        this.router.get(`${this.path}/`,this.getAll)
        .get(`${this.path}/:id`,this.getByUserId)
        .post(this.path,ValidationModel(OrderDTO),this.create)
        .patch(`${this.path}/:id`,ValidationModel(OrderDTO,true),this.update)
        .delete(`${this.path}/:id`,this.delete); 
       }
    private getAll=async(request:Request,reponse:Response)=>{
        const data=await this.orderRepository.find({relations:{Items:true}});
        reponse.send(data);
    }
    
    private getByUserId=async(request:Request,reponse:Response)=>{
        const id=Number(request.params.id);
        const data=await this.orderRepository.findBy({OrderId:id,});
        reponse.send(data);
    }
    private create=async(request:Request,reponse:Response)=>{
        const model:OrderDTO=request.body;
        const data=await this.orderRepository.insert(model);
        reponse.send(data);
    }
    
    private update=async(request:Request,reponse:Response)=>{
        const model:OrderDTO=request.body;
        const id=Number(request.params.id);
        const data=await this.orderRepository.update(id,model);
        reponse.send(data);
    }
    private delete=async(request:Request,reponse:Response)=>{
        const id=Number(request.params.id);
        const data=await this.orderRepository.delete(id);
        reponse.send(data);
    }

}
export default OrderController;