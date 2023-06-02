import { Group } from "src/group/group.entity";
import { PersonType } from "src/person_type/person_type.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity({name: 'person'})
export class Person{
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    firtName: String

    @Column()
    lastName: String

    @Column()
    document: Number

    @Column()
    state: boolean
    
    @OneToMany(()=>Group, group=> group.person)
    groups: Group[]
    
    @OneToMany(()=> PersonType, personType => personType.id)
    personTypes: PersonType[]
}