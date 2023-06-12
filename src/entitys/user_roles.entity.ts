import {Entity, Column, PrimaryGeneratedColumn, JoinColumn ,OneToOne} from 'typeorm';
import { Users } from './user.entity';
import { Roles } from './roles.entity'
@Entity({
    name: 'user_roles'
})
export class User_roles{
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @OneToOne(()=>Users,user=>user.id)
    @JoinColumn()
    idUser: Users
    
    @OneToOne(()=>Roles, rol => rol.id)
    @JoinColumn()
    idRol: Roles
}