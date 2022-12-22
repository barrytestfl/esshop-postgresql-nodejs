import { Type } from 'class-transformer';
import {IsString,IsNumber} from 'class-validator';
export default class AttributeDTO{
  @IsNumber()
  @Type((t)=>Number)
  public AttributeId:number;
  @IsString()
  public Name: string; 
  @IsNumber()  
  @Type((t)=>Number)
  public Priority: number=1; 
  @IsString()
  public Description: string='';
  @IsString()
  public AttributeType:string='';
  @IsNumber()  
  @Type((t)=>Number)
  public GroupId:number;

}