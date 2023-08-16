import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtConstants } from "src/common/constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
            secret:JwtConstants.SECRET,
            signOptions:{
                expiresIn:'1m'
            }
        })
    ],
    controllers:[AuthController],
    providers:[AuthService,LocalStategy,JwtStrategy]
})
export class AuthModuel{}