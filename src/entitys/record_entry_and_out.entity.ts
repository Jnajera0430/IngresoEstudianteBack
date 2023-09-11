import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Person } from "src/entitys/person.entity";
import { EntryType } from "src/entitys/entry_type.entity";
import { EntryVehicle } from "./entry_vehicle.entity";
import { EntryDevice } from "./entry_device.entity";
import { EntryPerson } from "./entry_person.entity";
@Entity({name: 'record_entry'})
export class Record_entry{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'timestamp'})
    checkIn: Date

    @Column({type: 'timestamp'})
    checkOut: Date

    @ManyToOne(()=>Person, person=>person.recorEntry)
    @JoinColumn({name: 'person'})
    person: Person

    @OneToOne(()=>EntryVehicle,(entryVehicle)=>entryVehicle.recordEntry)
    @JoinColumn({name: 'vehicleEntry'})
    vehicleEntry:EntryVehicle

    @OneToOne(()=>EntryDevice,deviceEntry=>deviceEntry.recordEntry,{
        cascade:true,
        eager:true,
        nullable:true
    })
    @JoinColumn({name: 'deviceEntry'})
    deviceEntry: EntryDevice

    @OneToOne(()=>EntryPerson,personEntry=>personEntry.recordEntry,{
        cascade:true,
        eager:true,
        nullable:true
    })
    @JoinColumn({name: 'personEntry'})
    personEntry: EntryPerson

    @OneToOne(()=>EntryType,entryType=>entryType.recordEntry,{
        cascade:true,
        eager:true,
        nullable:true
    })
    @JoinColumn({name:'entryType'})
    entryType: EntryType


}