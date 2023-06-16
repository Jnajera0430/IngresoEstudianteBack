import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { Users } from './user.entity';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    tipo:string
}