import { SetMetadata, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { InvalidTokenException, ValueNotFoundException } from 'src/exceptions/customExcepcion';
export const keyDecorate: string = 'permissions';
/**
 * 
 * @param permissions - Spread ...string
 * @returns @Decorators
 */
export const UserAllowed = (...permissions: string[]) => SetMetadata(keyDecorate, permissions);

export class PermisionsInterceptor implements NestInterceptor {
    constructor(
        private readonly reflector: Reflector = new Reflector()
    ) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const permissionsUser = this.reflector.get<string[]>(keyDecorate, context.getHandler());
        console.log({ permissionsUser });

        if (!permissionsUser || permissionsUser.length === 0) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest<Request>();
        const token = request.tokenDecode;

        if (!token) {
            throw new InvalidTokenException('Invalid token or not found.');
        }

        const hasPermissions = token.user.role.some((rol) => permissionsUser.includes(rol.tipo));
        if (!hasPermissions) {
            throw new ValueNotFoundException('Your user does not have permission to perform this process.');
        }
        return next.handle();
    }
}