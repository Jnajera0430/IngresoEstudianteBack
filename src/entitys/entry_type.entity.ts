import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'entry_type'})
export class EntryType{
    @PrimaryGeneratedColumn('increment')
    id: bigint
    @Column()
    name: string
}