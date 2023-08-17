import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { JwtConstants } from "../constants";

@Injectable()
export class JwtAuthGuard extends AuthGuard(['jwt']) {
    constructor(private reflector:Reflector){
        super()
    }
    canActivate(context : ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(JwtConstants.IS_PBULIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic){
            return true
        }
        return super.canActivate(context)
    }
}