import { IsString } from 'class-validator';

class LogInDTO {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default LogInDTO;