import { Type } from 'class-transformer';
import {IsNumber,IsString} from 'class-validator';
export default class BrandsDTO{
    @IsNumber()
    @Type((t)=>Number)
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