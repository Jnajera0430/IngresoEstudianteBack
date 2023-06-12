import { Roles } from "src/entitys/roles.entity";
import { Users } from "src/entitys/user.entity";

export class RoleDto{
    id?: number;
    tipo: string
}

export class UserRoleDto{
    id?: number;
    idUser: Users;
    idRol: Roles;
}

export enum roleEnum{
    SUPERUSUARIO = 'Super usuario',
    ADMINISTRADOR = 'Administrador',
    AUDITOR = 'Auditor',
    SERVICIO = 'Puesto de servicio'
}