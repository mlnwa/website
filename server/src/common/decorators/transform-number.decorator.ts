import { HttpException, HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { TypeUtil } from 'src/utils';

export const TransformJsonNumberArr = () => {
  return Transform(
    ({ value }) => {
      const parsedArray = JSON.parse(value);
      if (Array.isArray(parsedArray)) {
        if (!parsedArray.every(TypeUtil.isNumber)) {
          throw new HttpException({ message: 'Invalid input, expected a JSON number array' }, HttpStatus.BAD_REQUEST);
        }
        return parsedArray;
      } else {
        throw new HttpException({ message: 'Invalid input, expected a JSON number array' }, HttpStatus.BAD_REQUEST);
      }
    },
    { toPlainOnly: true },
  );
};
