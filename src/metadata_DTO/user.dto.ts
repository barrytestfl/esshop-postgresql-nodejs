import { IsOptional, IsString, ValidateNested } from 'class-validator';
import AddressDTO from './address.dto';

export default class UserDTO {
  @IsString()
  public FirstName: string;

  @IsString()
  public LastName: string;

  @IsString()
  public Email: string;

  @IsString()
  public Password: string;

  @IsOptional()
  @ValidateNested()
  public Address?: AddressDTO;
}

