import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";

@Entity({name: 'entry_device'})
export class EntryDevice{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    inside: boolean

    @Column()
    out: boolean

    @OneToOne(()=>Record_entry,(recordEntry)=>recordEntry.deviceEntry,{
        nullable: true,
    })
    @JoinColumn({
        name: 'recordEntry'
    })
    recordEntry: Record_entry

    @ManyToOne(()=>Device,device=>device,{
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({name: 'device'})
    device: Device

}