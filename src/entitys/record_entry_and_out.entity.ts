import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Person } from "src/entitys/person.entity";
import { EntryType } from "src/entitys/entry_type.entity";
import { EntryVehicle } from "./entry_vehicle.entity";
import { EntryDevice } from "./entry_device.entity";
import { EntryPerson } from "./entry_person.entity";
import { AbstractEntity } from "./abstractEntity.entity";
@Entity({ name: 'record_entry' })
export class Record_entry extends AbstractEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'timestamp' })
    checkIn: Date

    @Column({ type: 'timestamp', nullable: true })
    checkOut: Date

    @ManyToOne(() => Person, person => person.recorEntry, {
        nullable: true,
        lazy: true,
        eager: false,
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    person: Person

    @OneToOne(() => EntryVehicle, (entryVehicle) => entryVehicle.recordEntry, { nullable: true })
    @JoinColumn({ name: 'vehicleEntry' })
    vehicleEntry: EntryVehicle

    @OneToOne(() => EntryDevice, deviceEntry => deviceEntry.recordEntry, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'deviceEntry' })
    deviceEntry: EntryDevice
    
    @OneToMany(() => EntryType, entryType => entryType.recordEntry, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'entryType' })
    entryType: EntryType
    // @OneToOne(()=>EntryPerson,personEntry=>personEntry.recordEntry,{
    //     cascade:true,
    //     eager:true,
    //     nullable:true
    // })
    // @JoinColumn({name: 'personEntry'})
    // personEntry: EntryPerson
}