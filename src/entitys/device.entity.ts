import { DeviceType } from "src/entitys/device_type.entity";
import { Person } from "src/entitys/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntryDevice } from "./entry_device.entity";

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({ type: 'timestamp' })
    dateOfEntry: Date

    @Column({ type: 'timestamp' })
    dateOfOut: Date

    person: Person

    @OneToOne(()=>DeviceType,(type)=>type.device,{
        cascade:true,
        eager: true,
        nullable:true
    })
    @JoinColumn({name:'deviceType'})
    deviceType: DeviceType

    entryDevice: EntryDevice[]
}