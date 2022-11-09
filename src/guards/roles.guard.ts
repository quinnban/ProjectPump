import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.headers.role;
    console.log(roles.includes(userRole));
    return true;
  }
}