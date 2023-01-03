import { Repository } from "typeorm";
import AppDataSource from "../utils/ormcong";
import { ownRedis } from "./redisClient.redis";
import Product from "../entities/product.model";
import ICart,{ICartItem, ICoockisProduct} from './../interfaces/ICart';

export default class ShopingCart{
    private productRepository:Repository<Product>;
    private redis=new ownRedis();
    constructor(){
        this.productRepository=AppDataSource.getRepository(Product);
    }
     
    public async getCart(coockis:ICart){
        let cart:ICart={Items:[],SubTotal:0};
         for(let i=0;i<coockis.Items.length;i++){
          const  product= await this.productRepository.findOneBy({ProductId:coockis.Items[i].ProductId}); 
          if(product){
            const pimage=product.Images?.at(0)||'';
            const pcolor=product.Colors?.at(0)||'';    
            let item:ICartItem={ProductId:product.ProductId,ProductName:product.ProductName,Reference:product.Reference,Colors:pcolor,Image:pimage,Price:product.Price,Quantity:coockis.Items[i].Quantity,Total:(coockis.Items[i].Quantity*product.Price)};
                cart.Items.push(item)
            }
            cart.SubTotal = cart.Items.map(item => item.Total).reduce((acc, next) => acc + next);
                   
        };
        this.redis.client.set('cart',JSON.stringify(cart));
        return cart; 
    }
    public async addToCart(coockiproduct:ICoockisProduct,coockis:ICart ){
        const {ProductId,Quantity}:ICoockisProduct = coockiproduct;    
        let product=await this.productRepository.findOneBy({ProductId:ProductId});
        let cart:ICart=await this.getCart(coockis);
        if(product){
            if (cart.Items.length>0){
                    let findIndex=cart.Items.findIndex((item)=>item.ProductId==ProductId);
                    cart.Items[findIndex].Quantity=(Number(Quantity)+Number(cart.Items[findIndex].Quantity));
                    cart.Items[findIndex].Total=(cart.Items[findIndex].Quantity*cart.Items[findIndex].Price);
            }else{
                let item:ICartItem={ProductId:product.ProductId,ProductName:product.ProductName,Reference:product.Reference,Colors:'product.Colors[0].toString()',Image:'',Price:product.Price,Quantity:Quantity,Total:(Quantity*product.Price)};
                cart.Items.push(item)
            }
            cart.SubTotal = cart.Items.map(item => item.Total).reduce((acc, next) => acc + next);
        }
        return await this.getCart(cart);
    }
    public async removeFromCart(productId:number,coockis:ICart){       
        let cart:ICart=await this.getCart(coockis);
            if (cart.Items.length>0){
                   let findIndex=cart.Items.findIndex((item)=>item.ProductId==productId);
                   cart.Items.splice(findIndex);
            } 
            
            return await this.getCart(cart);
        }
        public createCookie(coockis:ICart) {
            return `cart=${JSON.stringify(coockis)}; HttpOnly; Max-Age=${60 * 60}`;
          } 
}