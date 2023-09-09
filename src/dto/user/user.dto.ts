import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsEmail, IsNotEmpty, IsString, IsArray, Length, ValidateNested } from "class-validator";
import { Role } from "src/entitys/roles.entity";
import { User } from "src/entitys/user.entity";
import { RoleDto } from "../roles/rol.dto";

export class UserDto {
    id?: number;
    email: string;
    username: string;
    password?: string;
    role: RoleDto[]
}

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

    @IsNotEmpty()
    @IsArray()
    roles: number[]
}


export class TokenDto {
    sub: number;
    user: UserDto;
    iat?: bigint
}

export class AuthLogin {
    token?: string;
    rol: Role;
    status: number;
    message: string;
    data: string;
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