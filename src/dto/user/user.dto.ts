import { Role } from "src/entitys/roles.entity";
import { User } from "src/entitys/user.entity";

export class CreateUserDto {
    email: string;
    username: string;
    password: string;
    roles: number[]
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

export class UpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
}