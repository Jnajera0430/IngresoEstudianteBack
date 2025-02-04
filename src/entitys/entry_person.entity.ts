import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";

@Entity({name:'entry_person'})
export class EntryPerson{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    inside: boolean

    @Column()
    out: boolean
    
    // @ManyToOne(()=>Record_entry,recordEntry=>recordEntry.personEntry)
    // @JoinColumn()
    // recordEntry: Record_entry
}