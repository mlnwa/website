import { JwtService } from "@nestjs/jwt";

export class AuthService {
    constructor(private readonly jwtService:JwtService){}

    async validateUser(userName:string,password:string):Promise<any>{
        
    }
}