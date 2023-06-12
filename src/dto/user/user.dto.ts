
export class CreateUserDto{
    email:string;
    username:string;
    password:string;
    tipo: string
}

export class UpdateUserDto{
    email?:string;
    username?:string;
    password?:string;
}