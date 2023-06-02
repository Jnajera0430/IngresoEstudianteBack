import {Entity, Column, PrimaryGeneratedColumn, JoinColumn ,OneToOne} from 'typeorm';
import { Users } from '../user/user.entity';
import { Roles } from '../roles/roles.entity'
@Entity({
    name: 'user_roles'
})
export class User_roles{
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @OneToOne(()=>Users)
    @JoinColumn()
    idUser: Users
    
    @OneToOne(()=>Roles)
    @JoinColumn()
    idRol: Roles
}