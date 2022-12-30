import { IsString,IsNumber, IsDateString,IsOptional } from 'class-validator';
class OrderDTO{
    @IsOptional()
    @IsNumber()
    public OrderId:number;
    @IsNumber()
    public UserId:number;
    @IsString()
    public OrderCode:string;
    @IsDateString()
    public OrderDate:Date;
    @IsString()
    public FullName:string;
    @IsString()
    public Mobile:string;
    @IsNumber()
    public AddressId:number;
    @IsNumber()
    public AmountInvoice:number;
    @IsNumber()
    public Off:number;
    @IsNumber()
    public TotalInvoice:number;     
    @IsString()
    public OrderStatus:string='pending';
}
export default OrderDTO;