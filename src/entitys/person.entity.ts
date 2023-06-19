import { Device } from "src/entitys/device.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Record_entry } from "./record_entry.entity";

@Entity({name: 'person'})
export class Person{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firtName: String

    @Column()
    lastName: String

    @Column()
    document: Number

    @Column()
    state: boolean
    
    @ManyToMany(()=>Group, group=> group.students)
    @JoinTable({name: "person_group"})
    groups: Group[]
    
    @ManyToOne(()=> PersonType, personType => personType.person)
    personTypes: PersonType

    @OneToMany(()=> Device, device => device.person)
    device: Device[]

    @OneToMany(()=> Vehicle, vehicle => vehicle.person)
    vehicle: Vehicle[]
    
    @OneToMany(()=>Record_entry,recordEntry=>recordEntry.person)
    recorEntry: Record_entry[]
}