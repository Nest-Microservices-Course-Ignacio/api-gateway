import { RpcException } from '@nestjs/microservices';

export interface RpcErrorResponse {
  status: number;
  message: string;
  [key: string]: any;
}

export class RpcCustomException extends RpcException {
  constructor(error: RpcErrorResponse) {
    super(error);
  }

  static badRequest(message: string, additionalData?: Record<string, any>): RpcCustomException {
    return new RpcCustomException({
      status: 400,
      message,
      ...additionalData,
    });
  }

  static unauthorized(message: string = 'Unauthorized', additionalData?: Record<string, any>): RpcCustomException {
    return new RpcCustomException({
      status: 401,
      message,
      ...additionalData,
    });
  }

  static forbidden(message: string = 'Forbidden', additionalData?: Record<string, any>): RpcCustomException {
    return new RpcCustomException({
      status: 403,
      message,
      ...additionalData,
    });
  }

  static notFound(message: string = 'Not Found', additionalData?: Record<string, any>): RpcCustomException {
    return new RpcCustomException({
      status: 404,
      message,
      ...additionalData,
    });
  }

  static internal(message: string = 'Internal Server Error', additionalData?: Record<string, any>): RpcCustomException {
    return new RpcCustomException({
      status: 500,
      message,
      ...additionalData,
    });
  }
} 