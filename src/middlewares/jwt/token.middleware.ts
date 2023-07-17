import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { InvalidTokenException } from "src/exceptions/customExcepcion";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private decode: object | undefined;
    constructor(
        private readonly jwtService: JwtService
    ) { }
    /**
     * Implements NestMiddleware's polymorphing feature and assigns a NameSpace value to Request
     * @param req Express->Request
     * @param res Express->Response
     * @param next Express->NextFunction
     */
    async use(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.cookies.access_token
        if (!token || !(await this.verifyToken(token))) {
            throw new InvalidTokenException();
        }
        if (this.decode) {
            req.tokenDecode = this.decode;
        }
        next();
    }
    /**
     * Returns a boolean if the token is valid
     * @param token String
     * @returns Promise
     */
    private async verifyToken(token: string): Promise<Boolean> {
        try {
            this.decode = await this.jwtService.verifyAsync(token)
            return true;
        } catch (error) {
            return false;
        }
    }
}