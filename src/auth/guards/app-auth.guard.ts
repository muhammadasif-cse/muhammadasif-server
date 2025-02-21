import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const appToken = request.headers['x-application-token'];

    if (appToken !== process.env.APPLICATION_TOkEN) {
      throw new ForbiddenException('Access denied. Invalid application token.');
    }

    return true;
  }
}
