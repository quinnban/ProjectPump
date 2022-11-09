import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    try {
      const token  = this.jwtService.verify(request.headers?.token)
      request.headers['role']= token.payload?.role;
    } catch(err){
      if(err.name === 'TokenExpiredError'){
        console.log('expired do some renew');
      } else {
        throw new HttpException(err.message, HttpStatus.UNAUTHORIZED)
      }
    }
    
    return true
    
  }
}