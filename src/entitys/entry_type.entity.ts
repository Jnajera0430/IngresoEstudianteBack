import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";


@Entity({name: 'entry_type'})
export class EntryType{
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    type: string
    
    @ManyToOne(()=>Record_entry,recordEntry=>recordEntry.entryType)
    @JoinColumn()
    recordEntry: Record_entry
}