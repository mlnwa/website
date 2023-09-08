import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtConstants } from 'src/common/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JwtConstants.SECRET,
      signOptions: {
        expiresIn: '10s',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModuel {}
