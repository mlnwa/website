import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResultModel } from '../result/ResultModel';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as {
      message: string | Array<string>;
    };

    if (typeof exceptionResponse == 'object' && exceptionResponse?.message) {
      const errorMsg =
        typeof exceptionResponse.message == 'string' ? exceptionResponse.message : exceptionResponse.message[0];
      response.status(status).json(ResultModel.builderErrorMsg(errorMsg).setCode('999'));
      return;
    }
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
