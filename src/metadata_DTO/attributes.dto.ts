import {IsString,IsNumber} from 'class-validator';
export default class AttributeDTO{
  @IsNumber()
  public AttributeId:number;
  @IsString()
  public Name: string; 
  @IsNumber()  
  public Priority: number=1; 
  @IsString()
  public Description: string='';
  @IsString()
  public AttributeType:string;
  public GroupId:string;

}