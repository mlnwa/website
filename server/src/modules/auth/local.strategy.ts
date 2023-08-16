import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "./auth.service";
import { HttpException, HttpStatus } from "@nestjs/common";

export class LocalStategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService :AuthService
    ){
        super()
    }

    async validate(username:string,password:string):Promise<any> {
        const user = this.authService.validateUser(username,password)
        if(!user){
            throw new HttpException({
                message:'authorized failed',
                error:'please try again later'
            },HttpStatus.BAD_REQUEST)
        }
    }
}