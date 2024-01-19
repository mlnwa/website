import { SetMetadata } from '@nestjs/common';
import { DecoratorConstants } from '../constants';

export const Public = () => SetMetadata(DecoratorConstants.IS_PBULIC_KEY, true);
