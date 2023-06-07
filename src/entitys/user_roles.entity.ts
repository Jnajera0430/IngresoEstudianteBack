import {Entity, Column, PrimaryGeneratedColumn, JoinColumn ,OneToOne} from 'typeorm';
import { Users } from './user.entity';
import { Roles } from './roles.entity'
@Entity({
    name: 'user_roles'
})
export class User_roles{
    @PrimaryGeneratedColumn('increment')
    id: bigint
    
    @OneToOne(()=>Users)
    @JoinColumn()
    idUser: Users
    
    @OneToOne(()=>Roles)
    @JoinColumn()
    idRol: Roles
}