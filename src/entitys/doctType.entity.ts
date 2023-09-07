import {Entity,PrimaryGeneratedColumn,Column, JoinColumn,OneToOne, OneToMany, ManyToOne} from 'typeorm'
import { Person } from "src/entitys/person.entity";

@Entity('Document_types')
export class DoctType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    person: Person
}