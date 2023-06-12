import { Device } from "src/entitys/device.entity";
import { Group } from "src/entitys/group.entity";
import { PersonType } from "src/entitys/person_type.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
    
    @OneToMany(()=>Group, group=> group.person)
    groups: Group[]
    
    @OneToMany(()=> PersonType, personType => personType.id)
    personTypes: PersonType[]

    @OneToMany(()=> Device, device => device.person)
    device: Device[]

    @OneToMany(()=> Vehicle, vehicle => vehicle.person)
    vehicle: Vehicle[]
    
}