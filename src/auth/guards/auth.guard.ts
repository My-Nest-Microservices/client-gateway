import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
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

    try {
      request['user'] = {
        id: 1,
        name: 'John Doe',
        email: 'V2r0s@example.com',
      };
      request['token'] = token;
    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Unauthorized',
      });
    }

    return true;
  }
}
