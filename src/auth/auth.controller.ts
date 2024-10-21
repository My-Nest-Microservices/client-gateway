import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() user: RegisterUserDto) {
    try {
      const createdUser = await firstValueFrom(
        this.client.send('auth.register.user', user),
      );

      return createdUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post('login')
  async loginUser(@Body() user: LoginUserDto) {
    try {
      const loginUser = await firstValueFrom(
        this.client.send('auth.login.user', user),
      );

      return loginUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('verify')
  async verifyUser(@Body() user: any) {
    return await firstValueFrom(this.client.send('auth.verify.user', user));
  }
}
