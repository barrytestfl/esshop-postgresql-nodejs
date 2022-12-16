import { IsString } from 'class-validator';

class AddressDTO {
  @IsString()
  public Street: string;
  @IsString()
  public City: string;
  @IsString()
  public Country: string;
}

export default AddressDTO;