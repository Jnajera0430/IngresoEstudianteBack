import { Device } from "src/entitys/device.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Record_entry } from "./record_entry.entity";

@Entity({name: 'person'})
export class Person{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    firtsName: String

    @Column()
    lastName: String

    @Column()
    document: Number

    @Column({type: "boolean", default: true})
    state: boolean
    
    @ManyToMany(()=>Group, group=> group.students,{
        cascade:true,
        eager:true,
        nullable:true
    })
    @JoinTable({name: "person_group"})
    groups: Group[]
    
    @ManyToOne(()=> PersonType, personType => personType.person,{
        cascade:true,
        eager:true,
        nullable:true
    })
    @JoinColumn({name:'personTypes'})
    personTypes: PersonType

    @OneToMany(()=> Device, device => device.person,{
        cascade:true,
        eager:true,
        nullable:true
    })
    device: Device[]

    @OneToMany(()=> Vehicle, vehicle => vehicle.person,{
        cascade:true,
        eager:true,
        nullable:true
    })
    vehicles: Vehicle[]
    
    @OneToMany(()=>Record_entry,recordEntry=>recordEntry.person,{
        cascade:true,
        eager:true,
        nullable:true
    })
    recorEntry: Record_entry[]
}