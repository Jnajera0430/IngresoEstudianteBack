import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";
import { AbstractEntity } from "./abstractEntity.entity";

@Entity({ name: 'record_device' })
export class RecordDevice extends AbstractEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    inside: boolean

    @Column()
    out: boolean

    @Column({ type: "timestamp", nullable: true })
    dateEntry: Date

    @Column({ type: "timestamp", nullable: true })
    dateExit: Date

    @ManyToOne(()=>Device,(device)=>device.id)
    @JoinColumn({name:'idDevice'})
    idDevice: number


    @ManyToOne(()=>Record_entry,(recordEntry)=>recordEntry.idRecordDevice,{
        nullable: true,
    })
    @JoinColumn({name:'idRecord'})
    idRecord: number

    // @ManyToOne(()=>Device,device=>device,{
    //     cascade: true,
    //     eager: false,
    //     nullable: true
    // })
    // @JoinColumn({name: 'device'})
    // device: Device

}