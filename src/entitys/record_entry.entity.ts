import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Person } from "src/entitys/person.entity";
import { EntryType } from "src/entitys/entry_type.entity";
@Entity({name: 'record_entry'})
export class Record_entry{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'timestamp'})
    checkIn: Date

    @Column({type: 'timestamp'})
    checkOut: Date

    @ManyToOne(()=>Person, person=>person.recorEntry)
    person: Person

    @OneToOne(()=>EntryType)
    entryType: EntryType
}