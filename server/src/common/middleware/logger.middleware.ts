import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { method, originalUrl } = req;
    const logger = new Logger('Request');
    logger.log(`${method} ${originalUrl}`);
    next();
  }
}
