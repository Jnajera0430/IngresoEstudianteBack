import { User } from 'src/entitys/user.entity';
import { Role } from 'src/entitys/roles.entity';
import { IsEmail, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class AuthUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: 'The password is invalid' })
    password: string;
}

export class AuthUserRolDto {
    @IsNumberString()
    id: number;
    idUser: User;
    idRol: Role;
}

export class AuthUserRolFoundDto {
    @IsNotEmpty()
    @IsString()
    token: string;
    @IsNotEmpty()
    @IsString()
    rol: string
}