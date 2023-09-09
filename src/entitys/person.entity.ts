import { Device } from "src/entitys/device.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { DoctType } from "src/entitys/doctType.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, OneToOne, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";

@Entity({ name: 'person' })
export class Person {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firtsName: String

    @Column()
    lastName: String

    @Column({unique: true})
    document: number

    @Column({ type: "boolean", default: true })
    state: boolean

    @ManyToMany(() => Group, group => group.people, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinTable()
    groups: Group[]

    @ManyToOne(() => PersonType, personType => personType.person, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'personTypes' })
    personTypes: PersonType

    @ManyToOne(() => DoctType,(doctType)=>doctType.person, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'doctType' })
    doctType: DoctType

    @OneToMany(() => Device, device => device.person, {
        cascade: true,
        eager: true,
        nullable: true
    })
    device: Device[]

    @OneToMany(() => Vehicle, vehicle => vehicle.person, {
        cascade: true,
        eager: true,
        nullable: true
    })
    vehicles: Vehicle[]

    @OneToMany(() => Record_entry, recordEntry => recordEntry.person, {
        cascade: true,
        eager: true,
        nullable: true
    })
    recorEntry: Record_entry[]
}