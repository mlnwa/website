import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}
