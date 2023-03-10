import express,{ Request, Response, Router } from "express";
import IController from "../interfaces/IController";
import IFilterProducts from "../interfaces/IFilterProducts";
import IFilterAttributes from './../interfaces/IFilterAttributes';
import AppDataSource  from '../utils/ormcong'
import Attribute from '../entities/attribute.model'; 
import Product from "../entities/product.model"; 
import ICart,{ICartItem, ICoockisProduct} from './../interfaces/ICart';
import ShopingCart from "../services/shopingCart.service";

class HomeController implements IController{
    public path: string="/";
    public router: Router=express.Router();
    private attributeRepository=AppDataSource.getRepository(Attribute);
    private productRepository=AppDataSource.getRepository(Product);
    private shopingcart=new ShopingCart();
    constructor(){
            this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path,this.index)
        .get(`${this.path}filterAttributes/:id`,this.filterAttributes)
        .get(`${this.path}filetrProducts/:id`,this.filetrProducts)
        .get(`${this.path}showcart`,this.showcart)
        .post(`${this.path}addcart`,this.addcart)
        .get(`${this.path}removecart/:id`,this.removecart)
        .post(`${this.path}pruchas`,this.pruchas);

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
    public showcart=async(request:Request,response:Response)=>{
        let cart:ICart={Items:[]};
        const cookies = request.cookies;
        
        if (cookies && cookies.cart) {
             cart=await this.shopingcart.getCart(JSON.parse(cookies.cart+''));    
        }        
        response.setHeader('Set-Cookie', [this.shopingcart.createCookie(cart)]);
        response.send(cart);
    }
    public addcart=async(request:Request,response:Response)=>{
        const {ProductId,Quantity}:ICoockisProduct = request.body;
        let cart:ICart={Items:[]};    
        const cookies = request.cookies;
        if (cookies && cookies.cart) {
            cart=(cookies && cookies.cart)?JSON.parse(cookies.cart+''):{Items:[]}  ;  
        }
        cart=await this.shopingcart.addToCart({ProductId,Quantity},cart);    
        response.setHeader('Set-Cookie', [this.shopingcart.createCookie(cart)]);
        response.send(cart);
         
    }
    public removecart=async(request:Request,response:Response)=>{
        const {id} = request.params;    
        let cart:ICart={Items:[]};    
        const cookies = request.cookies;
        if (cookies && cookies.cart) {
            cart=await this.shopingcart.removeFromCart(Number(id),JSON.parse(cookies.cart+''));    
        }
        response.setHeader('Set-Cookie', [this.shopingcart.createCookie(cart)]);
        response.send(cart); 
    }
    public pruchas=async(request:Request,response:Response)=>{
        let cart:ICart={Items:[],SubTotal:0};    
        
         response.setHeader('Set-Cookie', [this.shopingcart.createCookie(cart)]);       
        response.send({mesaage:"no cart"});
    }
}
export default HomeController;