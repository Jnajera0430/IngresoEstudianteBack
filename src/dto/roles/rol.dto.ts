import { Role } from "src/entitys/roles.entity";
import { User} from "src/entitys/user.entity";

export class RoleDto{
    id?: number;
    tipo: string
}

export class UserRoleDto{
    id?: number;
    idUser: User;
    idRol: Role;
}

export const roleEnum={
    1 :'Super usuario',
    2 : 'Administrador',
    3 :'Auditor',
    4 :'Puesto de servicio'
}

export declare enum RoleEnumByTypeRole{
    SUPER_USER = 1,
    ADMINISTRADOR = 2,
    AUDITOR = 3,
    PUESTO_DE_SERVICIO = 4
}
