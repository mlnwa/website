import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext,): boolean  {
    const roles = this.reflector.get<string[]>('roles',context.getHandler());
    if(!roles){
        return true
    }
    const request = context.switchToHttp().getRequest()
    const {user} = request.query;
    return !!roles.find(role => role === user)
  }
}
