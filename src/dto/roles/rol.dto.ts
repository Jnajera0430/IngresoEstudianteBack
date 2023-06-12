export class RoleDto{
    id?: number;
    tipo: string
}

export enum roleEnum{
    SUPERUSUARIO = 'Super usuario',
    ADMINISTRADOR = 'Administrador',
    AUDITOR = 'Auditor',
    SERVICIO = 'Puesto de servicio'
}