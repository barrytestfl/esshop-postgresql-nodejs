import { IsEmail, IsString } from 'class-validator';

class LogInDTO {
  @IsString()
  @IsEmail()
  public Email: string;

  @IsString()
  public Password: string;
}

export default LogInDTO;