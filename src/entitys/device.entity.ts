import { DeviceType } from "src/entitys/device_type.entity";
import { Person } from "src/entitys/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntryDevice } from "./entry_device.entity";
import { Record_entry } from "./record_entry_and_out.entity";

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn('increment')
    id: number
<<<<<<< HEAD
    @Column({ type: 'timestamp', nullable: true })
=======
    @Column({ type: 'timestamp', nullable: true})
>>>>>>> d88541c651520337417c330186b23fc3a8793cfb
    dateOfEntry: Date

    @Column({ type: 'timestamp', nullable: true })
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

    // @OneToMany(()=>EntryDevice,entryDevice=>entryDevice.recordEntry)
    // @JoinColumn()
    // entryDevice: EntryDevice[]

    @ManyToOne(()=>Record_entry,recordEntry=>recordEntry.vehicleEntry)
    @JoinColumn()
    recordEntry: Record_entry[]
}