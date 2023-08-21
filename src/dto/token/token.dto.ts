import { IsNumber, IsObject } from "class-validator";
import { UserPayload } from "../user/user.dto";
import { Type } from "class-transformer";
import { isBigInt64Array } from "util/types";

export class TokenPayload{
    @IsNumber()
    sub?: number;
    @IsObject()
    @Type(()=>UserPayload)
    user?:UserPayload;
    
    iat?: bigint;
    exp?: bigint
}