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

    @Column({ length: 50, nullable: true, unique: true }) //se tiene que quitar el nulluable
    serialId: string

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
}