import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthCommands } from 'src/common/cmd/auth.cmd';
import { NATS_SERVICE } from 'src/config/services';
import { RegisterDTO } from './dto/register.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Post('register')
  setRegisterUser(@Body() data: RegisterDTO) {
    return this.client.send({ cmd: AuthCommands.AUTH_REGISTER_USER }, data);
  }

  @Post('login')
  setLoginUser(@Body() data: LoginUserDTO) {
    return this.client.send({ cmd: AuthCommands.AUTH_LOGIN_USER }, data);
  }

  @Post('verify')
  verifyUser(@Body() data: any) {
    return this.client.send({ cmd: AuthCommands.AUTH_VERIFY_USER }, data);
  }
}
