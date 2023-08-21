import {Entity,PrimaryGeneratedColumn,Column, JoinColumn,OneToOne} from 'typeorm'
import { Person } from "src/entitys/person.entity";

@Entity('Document_types')
export class DoctType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @OneToOne(()=>Person, person=>person.doctType)
    @JoinColumn({name:'person'})
    person: Person

    @Column()
    name: string
}