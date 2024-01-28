import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail({}, { message: '邮箱格式错误' })
  email: string;

  @IsString()
  emailCode: string;
}
