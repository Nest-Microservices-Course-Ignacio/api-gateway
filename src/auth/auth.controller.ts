import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthCommands } from 'src/common/cmd/auth.cmd';
import { NATS_SERVICE } from 'src/config/services';
import { LoginUserDTO } from './dto/loginUser.dto';
import { RegisterDTO } from './dto/register.dto';
import { catchError, throwError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private client: ClientProxy) {}

  @Post('register')
  setRegisterUser(@Body() data: RegisterDTO) {
    return this.client
      .send({ cmd: AuthCommands.AUTH_REGISTER_USER }, data)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Post('login')
  setLoginUser(@Body() data: LoginUserDTO) {
    return this.client
      .send({ cmd: AuthCommands.AUTH_LOGIN_USER }, data)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }

  @Post('verify')
  verifyUser(@Body() data: any) {
    return this.client
      .send({ cmd: AuthCommands.AUTH_VERIFY_USER }, data)
      .pipe(catchError((error) => throwError(() => new RpcException(error))));
  }
}
