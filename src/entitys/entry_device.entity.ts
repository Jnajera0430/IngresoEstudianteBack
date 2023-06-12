import { Record_entry } from "src/entitys/record_entry.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'entry_device'})
export class EntryDevice{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    inside: boolean

    @Column()
    out: boolean

    @OneToOne(()=>Record_entry)
    @JoinColumn()
    recordEntry: Record_entry

}