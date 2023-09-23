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
    id: number;

    @Column({ type: 'timestamp' })
    checkIn: Date;

    @Column({ type: 'timestamp', nullable: true })
    checkOut: Date;

    @ManyToOne(() => Person, person => person.recorEntry, {
        nullable: true,
        lazy: true,
        eager: false,
        onUpdate: "CASCADE"
    })
    @JoinColumn({ name: 'person' })
    person: Person;

    @OneToMany(() => EntryVehicle, (entryVehicle) => entryVehicle.recordEntry, { nullable: true })
    @JoinColumn({ name: 'vehicleEntry' })
    vehicleEntry: EntryVehicle[];

    @OneToMany(() => EntryDevice, deviceEntry => deviceEntry.recordEntry, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'deviceEntry' })
    deviceEntry: EntryDevice[];

    @OneToMany(() => EntryType, entryType => entryType.recordEntry, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'entryType' })
    entryType: EntryType;
    @OneToMany(() => EntryPerson, personEntry => personEntry.recordEntry, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'personEntry' })
    personEntry: EntryPerson[];
}