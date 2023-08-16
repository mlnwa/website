import { IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty({message:"用户名不能为空"})
    @IsString()
    name:string

    @IsNotEmpty({message:"密码不能为空"})
    @IsString()
    password:string
}