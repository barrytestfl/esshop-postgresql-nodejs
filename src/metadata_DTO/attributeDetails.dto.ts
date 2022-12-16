import { IsString, IsNumber } from 'class-validator'; 

export default  class AttributeDetailsDTO {
  @IsNumber()
  public ProductId: number; 
  @IsNumber()
  public AttributeId: number; 
  @IsNumber()
  public AttributeValueId?: number; 
  @IsString()
  public Value?: string; 
}
 
