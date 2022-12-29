import{IsNumber,IsString,IsOptional} from 'class-validator';
class OrderItemDTO{
    @IsOptional()
    @IsNumber()
    public OrderItemId:number;
    @IsNumber()
    public OrderId:number;
    @IsNumber()
    public ProductId:number;
    @IsString()
    public ProductName:string;
    @IsString()
    public Reference:string;
    @IsString()
    public Colors:string;
    @IsNumber()
    public Count:number;
    @IsNumber()
    public Price:number; 
    @IsNumber()
    public TotalPrice:number=0;
    @IsString()
    public Images:string;
    }
    export default OrderItemDTO;