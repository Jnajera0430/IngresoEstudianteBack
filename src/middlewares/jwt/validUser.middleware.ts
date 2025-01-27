import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { RoleDto, roleEnum } from "src/dto/roles/rol.dto";
import { RoleEnumByType, RoleEnumByTypeRole } from "src/constants/roles.enum";
import { Role } from "src/entitys/roles.entity";
import { UserUnauthorizedException } from "src/exceptions/customExcepcion";

@Injectable()
export class ValidUser implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
    ) { }
    /**
     * Middleware for virify that the user have role valid
     * @param req 
     * @param res 
     * @param next 
     */
    async use(req: Request, res: Response, next: NextFunction) {
        const { user } = req.tokenDecode;
        if(!this.validUser(user.role)){
            throw new UserUnauthorizedException();
        }
        next();
    }
    /**
     * This method checks if the user has the allowed role to perform that action.
     * @param roles Role [ ]
     * @returns boolean
     */
    validUser(roles: RoleDto[]): boolean {
        for (let role of roles) {           
            switch (role.tipo) {
                case RoleEnumByType.SUPER_USER:
                    return true;
                case RoleEnumByType.ADMINISTRADOR:
                    return true;
            }
        }
        return false;
    }
}