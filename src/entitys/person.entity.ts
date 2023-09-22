import { Device } from "src/entitys/device.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { DoctType } from "src/entitys/doctType.entity";
import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne,
    JoinTable, ManyToOne, JoinColumn
} from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";
import { AbstractEntity } from "./abstractEntity.entity";

@Entity({ name: 'person' })
export class Person extends AbstractEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firtsName: String

    @Column()
    lastName: String

    @Column({ unique: true })
    document: number

    @Column({ type: "boolean", default: true })
    state: boolean

    @ManyToMany(() => Group, group => group.students, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinTable()
    groups: Group[]

    @ManyToOne(() => PersonType, personType => personType.person, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'personTypes' })
    personTypes: PersonType

    @ManyToOne(() => DoctType, (doctType) => doctType.person, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'doctType' })
    doctType: DoctType

    @OneToMany(() => Device, device => device.person, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'device' })
    device: Device[]

    @OneToMany(() => Vehicle, vehicle => vehicle.person, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'vehicles' })
    vehicles: Vehicle[]

    @OneToMany(() => Record_entry, recordEntry => recordEntry.person, { lazy: true, eager: false })
    @JoinColumn({name:'recorEntry'})
    recorEntry: Record_entry[]
}