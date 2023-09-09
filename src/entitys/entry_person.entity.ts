import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";

@Entity({name:'entry_person'})
export class EntryPerson{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    inside: boolean

    @Column()
    out: boolean

    @OneToOne(()=>Record_entry)
    @JoinColumn({name: 'person_record'})
    recordEntry: Record_entry
}