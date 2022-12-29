import express,{ Request, request, Response, Router } from "express";
import IController from "../interfaces/IController";
import IFilterProducts from "../interfaces/IFilterProducts";
import IFilterAttributes from './../interfaces/IFilterAttributes';
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
        let data=await this.listAll<IFilterProducts>("select * from filterProducts(0,'0','',0,0,0,2,0)");
            response.send(data.filterproducts);
    }
    async listAll<T>(sql:string): Promise<T> {
        let list = await AppDataSource.query(sql);
        return list[0] as T;
    }
    private filterAttributes=async (request:Request,response:Response)=>{
        const {id}=request.params;
        const sql=`select * from filterattributes(0,'','',0,0)`;
        let data=await this.listAll<IFilterAttributes>(sql);
         
        response.send(data.filterattributes.attributeValues);
    }
    
}
export default HomeController;