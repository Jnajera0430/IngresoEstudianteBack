import { DeviceType } from "src/entitys/device_type.entity";
import { Person } from "src/entitys/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecordDevice } from "./entry_device.entity";

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn('increment')
    id: number

    @ManyToOne(() => Person, person => person.device)
    @JoinColumn()
    person: number

    @ManyToOne(() => DeviceType, (type) => type.device, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'deviceType' })
    deviceType: DeviceType

    @OneToMany(() => RecordDevice, (recordDevice) => recordDevice.idDevice)
    @JoinColumn({ name: 'idDeviceRecord' })
    idDeviceRecord: RecordDevice[]

    // @Column({ type: 'timestamp', nullable: true})
    // dateOfEntry: Date

    // @Column({ type: 'timestamp', nullable: true })
    // dateOfOut: Date
    // @OneToMany(()=>EntryDevice,entryDevice=>entryDevice.recordEntry)
    // @JoinColumn()
    // entryDevice: EntryDevice[]

    // @ManyToOne(()=>Record_entry,recordEntry=>recordEntry.vehicleEntry)
    // @JoinColumn()
    // recordEntry: Record_entry[]
}