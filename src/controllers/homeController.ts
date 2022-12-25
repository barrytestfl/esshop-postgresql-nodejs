import express,{ Request, request, Response, Router } from "express";
import IController from "../interfaces/IController";
import AppDataSource  from '../utils/ormcong'
import Attribute from '../entities/attribute.model';
import AttributeValue from "../entities/attributeValue.model";
import AttributeDetail from "../entities/attributeDetail.model";
import Product from "../entities/product.model";
import Brand from "../entities/brand.model";
import Group from "../entities/group.model"; 

class HomeController implements IController{
    public path: string="/";
    public router: Router=express.Router();
    private attributeRepository=AppDataSource.getRepository(Attribute);
    private attributeValueRepository=AppDataSource.getRepository(AttributeValue);
    private attributeDetailRepository=AppDataSource.getRepository(AttributeDetail);
    private productRepository=AppDataSource.getRepository(Product);
    constructor(){
            this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path,this.index)
        .get(`${this.path}filterAttributes/:id`,this.filterAttributes)
        .get(`${this.path}filetrProducts/:id`,this.filetrProducts)
    }
    private index=async (request:Request,response:Response)=>{
        let data=await this.attributeRepository.find();
        response.send({data:"hi"});
    }
    private filetrProducts=async (request:Request,response:Response)=>{
        const {id}=request.params;
        let data=await this.productRepository.find(
            {
                where:{GroupId:Number(id)},
                skip:0,
                take:10,
                order:{ProductId:'ASC'},
                
            
            }
        );
        response.send(data);
    }
    private filterAttributes=async (request:Request,response:Response)=>{
        const {id}=request.params;
        //const data=await this.attributeRepository.find({relations:{attributeValues:true}})
         const data =AppDataSource.createQueryBuilder()
         .select("att")         
         .from(Attribute, "att")
         .innerJoin(AttributeValue, "patt", "patt.AttributeId = att.AttributeId")
         .getMany()
        response.send(data)
    }
    
}
export default HomeController;