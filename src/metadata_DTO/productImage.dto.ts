import { IsNumber, IsString, IsOptional } from 'class-validator'; 
 
class ProductImageDTO {
  @IsNumber()
  public ProductId:number;
  @IsString()
  public Image:string;
  @IsNumber()
  @IsOptional()
  public Prority?:number;
}
 
export default ProductImageDTO;