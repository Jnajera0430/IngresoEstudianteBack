import { HttpException, HttpStatus } from "@nestjs/common";
/**
 * 
 */
export class InvalidTokenException extends HttpException{
    constructor(){
        super('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
}

export class UserUnauthorizedException extends HttpException{
    constructor(){
        super('The user is not authorized to do this action', HttpStatus.UNAUTHORIZED);
    }
}

export class ValueNotFound extends HttpException{
    constructor(message:string){
        super(message,HttpStatus.NOT_FOUND);
    }
}