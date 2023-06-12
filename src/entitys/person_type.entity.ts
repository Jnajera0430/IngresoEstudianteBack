import { Person } from "src/entitys/person.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person_type'})
export class PersonType{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string

    @ManyToOne(()=>Person, person=>person.personTypes)
    person: Person
}