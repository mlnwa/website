import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalEmailStategy extends PassportStrategy(Strategy, 'localByEmail') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'emailCode',
    });
  }

  async validate(email: string, emailCode: string) {
    const userResult = await this.authService.validateUserByEmail(email, emailCode);
    if (!userResult.getSuccess()) {
      throw new UnauthorizedException(userResult.getMsg());
    }
    return userResult.getResult();
  }
}
