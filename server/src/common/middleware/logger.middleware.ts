import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const { method, originalUrl, body } = req;
    const logger = new Logger('Request');
    let message = `${method} ${originalUrl}`;
    if (method == 'POST' || method == 'PUT') {
      message += ` body: ${JSON.stringify(body)}`;
    }
    logger.log(message);
    next();
  }
}
