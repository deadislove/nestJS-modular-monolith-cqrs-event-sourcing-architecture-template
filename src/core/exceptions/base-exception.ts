export abstract class BaseException extends Error {
    constructor(
        public readonly code:string,
        public readonly message: string,
        public readonly statusCode: number = 400
    ){
        super(message)
    }
}

export class DomainException extends BaseException {
    constructor(code: string, message: string, statusCode: number = 400) {
        super(code, message, statusCode)
    }
}