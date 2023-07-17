import { UserPayload } from "../user/user.dto";

export class TokenPayload{
    sub?: number;
    user?:UserPayload;
    iat?: bigint;
    exp?: bigint
}