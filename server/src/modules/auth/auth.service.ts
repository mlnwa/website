import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { ResultModel } from 'src/common/result/ResultModel';
import * as bcrypt from 'bcrypt';
import { EMailService } from '../email/email.service';
import { RedisService } from '../redis/redis.service';
import { IdUtil } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EMailService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(userName: string, password: string): Promise<ResultModel> {
    const userResultModel = await this.userService.findByName(userName);
    if (!userResultModel.getSuccess()) return userResultModel;
    const user: UserEntity = userResultModel.getResult();
    const isMatch = bcrypt.compareSync(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return ResultModel.builderSuccess().setResult(result);
    }
    return ResultModel.builderErrorMsg('密码错误');
  }

  async login(user: any): Promise<ResultModel> {
    const payload = { username: user.name, sub: user.id };
    const token = this.jwtService.sign(payload);
    return ResultModel.builderSuccess().setResult({
      accessToken: token,
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken);
  }

  async sendEmailCode(email: string) {
    if (await this.redisService.has(email)) {
      return ResultModel.builderErrorMsg('发送过于频繁，请稍后再试');
    }
    const code = IdUtil.uuidOfNumber(4);
    return this.emailService
      .sendEmail({
        to: email,
        subject: '邮箱验证码',
        html: `<p>您的验证码是：${code}</p>`,
      })
      .then(() => {
        this.redisService.set(email, code, 60);
        return ResultModel.builderSuccessMsg('验证码发送成功');
      })
      .catch(() => {
        return ResultModel.builderErrorMsg('验证码发送失败，请稍后再试');
      });
  }
}
