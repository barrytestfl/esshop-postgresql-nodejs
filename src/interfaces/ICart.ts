export interface ICartItem{
        ProductId:number;
        ProductName:string;
        Reference:string;
        Quantity:number;
        Colors:string;
        Price:number;
        Total:number;
        Image:string;
}
export interface ICoockisProduct{
    ProductId:number;
    Quantity:number;
}
export default interface ICart{
    Items:ICartItem[]
    SubTotal?:number;
}