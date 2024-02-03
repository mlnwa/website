import { IsJSON, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TransformJsonNumberArr } from 'src/common/decorators';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsJSON()
  @IsOptional()
  @TransformJsonNumberArr()
  permissionIds: number[];
}
