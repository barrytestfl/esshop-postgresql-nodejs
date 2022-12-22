import { Type } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator'; 

export default  class AttributeDetailsDTO {
  @IsNumber()
  @Type((t)=>Number)
  public ProductId: number; 
  @IsNumber()
  @Type((t)=>Number)
  public AttributeId: number; 
  @IsNumber()
  @Type((t)=>Number)
  public AttributeValueId?: number; 
  @IsString()
  public Value?: string; 
}
 
