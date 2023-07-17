import {TokenPayload} from '../dto/token/token.dto'
declare module "express" {
    export interface Request{
        tokenDecode?: TokenPayload | undefined 
    }
}