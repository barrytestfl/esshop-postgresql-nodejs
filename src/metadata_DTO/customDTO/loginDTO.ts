import { IsString } from 'class-validator';

class LogInDTO {
  @IsString()
  public Email: string;

  @IsString()
  public Password: string;
}

export default LogInDTO;