
export class CreateUserDto{
    email:string;
    username:string;
    password:string;
}

export class UpdateUserDto{
    email?:string;
    username?:string;
    password?:string;
}