import { Role } from "src/entitys/roles.entity";
import { User } from "src/entitys/user.entity";

export class CreateUserDto {
    id?:number;
    email: string;
    username: string;
    password: string;
    roles: number[]
}

export class UserDto {
    id?:number;
    email: string;
    username: string;
    password: string;
    role: Role[]
}

export class TokenDto {
    sub: number;
    user: User;
    iat?: bigint
}

export class AuthLogin {
    token: string;
    rol: string;
}

export type UpdateUserDto = Partial<CreateUserDto> 
export type UserPayload = Partial<UserDto> 