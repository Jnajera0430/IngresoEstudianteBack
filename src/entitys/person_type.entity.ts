import { Person } from "src/entitys/person.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person_type'})
export class PersonType{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string

    person: Person[]

    @Column({type:"boolean", default:true})
    state: boolean
}