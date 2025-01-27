import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "src/entitys/roles.entity";
import { User } from "src/entitys/user.entity";
import { UserDto } from "../user/user.dto";

export class RoleDto {
    @IsNumber()
    id?: number;
    @IsNotEmpty()
    @IsString()
    tipo: string
}

export class UserRoleDto {
    id?: number;
    idUser: UserDto;
    idRol: Role;
}

export const roleEnum = {
    1: 'Super usuario',
    2: 'Administrador',
    3: 'Auditor',
    4: 'Puesto de servicio'
}

