import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { Users } from './user.entity';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    tipo:string

    @ManyToMany(()=>Users,user=>user.role)
    user:Users[]
}