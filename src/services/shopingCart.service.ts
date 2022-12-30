import { Repository } from "typeorm";
import AppDataSource from "../utils/ormcong";
import Product from "../entities/product.model";
import ICart,{ICartItem, ICoockisProduct} from './../interfaces/ICart';

export default class ShopingCart{
    private productRepository:Repository<Product>;
    constructor(){
        this.productRepository=AppDataSource.getRepository(Product);
    }
     
    public async getCart(coockis:ICoockisProduct[]){
        let cart:ICart={Items:[]};
         for(let i=0;i<coockis.length;i++){
          const  product= await this.productRepository.findOneBy({ProductId:coockis[i].ProductId}); 
          if(product){
                let item:ICartItem={ProductId:product.ProductId,ProductName:product.ProductName,Reference:product.Reference,Colors:'product.Colors[0].toString()',Image:'',Price:product.Price,Quantity:coockis[i].Quantity,Total:(coockis[i].Quantity*product.Price)};
                cart.Items.push(item)
            }
            cart.SubTotal = cart.Items.map(item => item.Total).reduce((acc, next) => acc + next);
                   
        };
        
        return cart; 
    }
    public async addToCart(coockiproduct:ICoockisProduct,coockis:ICoockisProduct[] ){
        const {ProductId,Quantity}:ICoockisProduct = coockiproduct;    
        let product=await this.productRepository.findOneBy({ProductId:ProductId});
        let cart:ICart=await this.getCart(coockis);
        if(product){
            if (cart.Items.length>0){
                    let findIndex=cart.Items.findIndex((item)=>item.ProductId==ProductId);
                    cart.Items[findIndex].Quantity=(Quantity+cart.Items[findIndex].Quantity);
                    cart.Items[findIndex].Total=(cart.Items[findIndex].Quantity*cart.Items[findIndex].Price);
            }else{
                let item:ICartItem={ProductId:product.ProductId,ProductName:product.ProductName,Reference:product.Reference,Colors:'product.Colors[0].toString()',Image:'',Price:product.Price,Quantity:Quantity,Total:(Quantity*product.Price)};
                cart.Items.push(item)
            }
            cart.SubTotal = cart.Items.map(item => item.Total).reduce((acc, next) => acc + next);
        }
        return cart;
    }
    public async removeFromCart(productId:number,coockis:ICoockisProduct[]){       
        let cart:ICart=await this.getCart(coockis);
            if (cart.Items.length>0){
                    cart.Items.forEach((item)=>item.ProductId!=productId);
                    let findIndex=cart.Items.findIndex((item)=>item.ProductId==productId);
                    cart.Items.splice(findIndex);
                    cart.SubTotal = cart.Items.map(item => item.Total).reduce((acc, next) => acc + next);       
            } 
            
            return cart;
        }
        public createCookie(coockis:ICart) {
            return `cart=${JSON.stringify(coockis)}; HttpOnly; Max-Age=${60 * 60}`;
          } 
}