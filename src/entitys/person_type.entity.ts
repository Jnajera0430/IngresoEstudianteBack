import { Person } from "src/entitys/person.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'person_type'})
export class PersonType{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string
    
    @OneToMany(()=>Person,person=>person.personTypes)
    @JoinColumn()
    person: Person[]

    @Column({type:"boolean", default:true})
    state: boolean
}