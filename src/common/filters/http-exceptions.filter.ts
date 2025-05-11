import { BaseException } from "@core/exceptions/base-exception";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        let message: string = 'Internal server error'
        let code: string = 'UNKNOWN_ERROR'

        if(exception instanceof BaseException) {
            status = exception.statusCode
            message = exception.message
            code = exception.code
        } else if (exception instanceof HttpException) {
            status = exception.getStatus()
            const res = exception.getResponse()

            if( typeof res === 'object' && res != null) {
                message = (res as any).message || message
            }
        }

        response.status(status).json({
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message
        })
    }
}