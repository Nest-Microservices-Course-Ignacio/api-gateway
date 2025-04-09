import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { RpcErrorResponse } from './rpc-custom-exception';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    let message = 'Internal server error';
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const rpcError = exception.getError();

    if (typeof rpcError === 'string' && rpcError.includes('Empty response')) {
      message = 'Empty Response';
    }

    // Check if the error has the expected structure
    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const errorResponse = rpcError as RpcErrorResponse;
      const status = isNaN(+errorResponse.status)
        ? 400
        : Number(errorResponse.status);

      return response.status(status).json(errorResponse);
    }

    // Default error response for unexpected error formats
    return response.status(400).json({
      status: 400,
      message: typeof rpcError === 'string' ? rpcError : message,
    });
  }
}
