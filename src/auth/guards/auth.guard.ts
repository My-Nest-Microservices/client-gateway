import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;

    const token = request.headers?.authorization
      ? request.headers.authorization.split(' ')[1]
      : null;

    if (!token) {
      throw new RpcException({
        status: 401,
        message: 'Unauthorized',
      });
    }

    const data = this.client.send('auth.verify.user', token).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    const { user, token: newToken } = await firstValueFrom(data);

    try {
      request['user'] = user;
      request['token'] = newToken;
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Unauthorized',
      });
    }

    return true;
  }
}
