import { User } from 'src/entitys/user.entity';
import { Role } from 'src/entitys/roles.entity';

export class AuthUserDto{
    email: string;
    password: string;
}

export class AuthUserRolDto{
    id: number;
    idUser: User;
    idRol: Role;
}

export class AuthUserRolFoundDto{
    token: string;
    rol: string
}