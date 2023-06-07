import { DeviceType } from "src/entitys/device_type.entity";
import { Person } from "src/entitys/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn('increment')
    id: bigint
    @Column({ type: 'timestamp' })
    dateOfEntry: Date

    @Column({ type: 'timestamp' })
    dateOfOut: Date

    @ManyToOne(()=>Person, person=>person.device)
    person: Person

    @OneToOne(()=>DeviceType)
    @JoinColumn()
    deviceType: DeviceType
}