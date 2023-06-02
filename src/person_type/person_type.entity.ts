import { Person } from "src/person/person.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person_type'})
export class PersonType{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @ManyToOne(()=>Person, person=>person.personTypes)
    person: Person
}