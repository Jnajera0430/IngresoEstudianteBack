import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { roleEnum } from "src/dto/roles/rol.dto";
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
    validUser(roles: Role[]): boolean {
        for (let role of roles) {
            switch (roleEnum[`${role.id}`]) {
                case "Super usuario":
                    return true;
                case "Administrador":
                    return true;
            }
        }
        return false;
    }
}