import { Users } from 'src/entitys/user.entity';
import { Roles } from 'src/entitys/roles.entity';

export class AuthUserDto{
    email: string;
    password: string;
}

export class AuthUserRolDto{
    id: number;
    idUser: Users;
    idRol: Roles;
}

export class AuthUserRolFoundDto{
    token: string;
    rol: string
}