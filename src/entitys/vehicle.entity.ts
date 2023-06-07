import { EntryVehicle } from "src/entitys/entry_vehicle.entity";
import { Person } from "src/entitys/person.entity";
import { VehicleType } from "src/entitys/vehicle_type.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'vehicles'})
export class Vehicle{
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column({ type: 'timestamp' })
    dateOfEntry: Date

    @Column({ type: 'timestamp' })
    dateOfOut: Date

    @ManyToOne(()=>Person, person=>person.vehicle)
    person: Person

    @OneToOne(()=>VehicleType)
    vehicleType: VehicleType

    @OneToMany(()=>EntryVehicle, entryVehicle=>entryVehicle.vehicle)
    entryVehicle:EntryVehicle[]

}