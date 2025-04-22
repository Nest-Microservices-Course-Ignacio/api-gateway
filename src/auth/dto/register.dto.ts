import { IsPhoneNumber, IsString } from 'class-validator';
import { LoginUserDTO } from './loginUser.dto';

export class RegisterDTO extends LoginUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  address: string;
}
