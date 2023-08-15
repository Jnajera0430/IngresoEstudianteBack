import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsEmail, IsNotEmpty, IsString, IsArray, Length } from "class-validator";
import { Role } from "src/entitys/roles.entity";
import { User } from "src/entitys/user.entity";

export class CreateUserDto {
    @IsNumber()
    id?: number;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: 'The password is invalid' })
    password: string;
    @IsArray()
    roles: number[]
}

export class UserDto {
    id?: number;
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


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsNumber()
    id?: number;
}
export class UserPayload extends PartialType(UserDto) { }
// export class UpdateUserDto {
//     id: number;
//     email?: string;
//     username?: string;
//     password?: string;
//     roles?: number[];
// }