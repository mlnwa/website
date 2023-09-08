import { SetMetadata } from '@nestjs/common';
import { JwtConstants } from '../constants';

export const Public = () => SetMetadata(JwtConstants.IS_PBULIC_KEY, true);
