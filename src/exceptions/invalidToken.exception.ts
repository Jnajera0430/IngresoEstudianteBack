import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidTokenException extends HttpException{
    constructor(){
        super('Token inválido', HttpStatus.UNAUTHORIZED);
    }
}