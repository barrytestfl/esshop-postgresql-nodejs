import {IsNumber,IsString} from 'class-validator';
export default class BrandsDTO{
    @IsNumber()
    public BrandId:number;
    @IsString()
    public BrandName:string;
   @IsString()    
    public BrandImage:string;
   @IsString()    
    public BoxImage:string;
   @IsString()    
    public Discription:string;    
}