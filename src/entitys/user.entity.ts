import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToMany} from 'typeorm';
import { Roles } from './roles.entity';

@Entity({
    name: 'users'
})
export class Users{
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({unique: true})
    email: string
    @Column()
    username: string
    @Column()
    password: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ManyToMany(()=>Roles, roles=> roles.user)
    role: Roles[] 
}