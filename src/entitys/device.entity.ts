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

    @ManyToOne(()=>Person,person=>person.device)
    @JoinColumn()
    person: Person

    @ManyToOne(()=>DeviceType,(type)=>type.device,{
        cascade:true,
        eager: false,
        nullable:true
    })
    @JoinColumn({name:'deviceType'})
    deviceType: DeviceType

    @OneToMany(()=>EntryDevice,entryDevice=>entryDevice.recordEntry)
    @JoinColumn()
    entryDevice: EntryDevice[]
}