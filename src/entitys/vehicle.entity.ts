import { EntryVehicle } from "src/entitys/entry_vehicle.entity";
import { Person } from "src/entitys/person.entity";
import { VehicleType } from "src/entitys/vehicle_type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Record_entry } from "./record_entry_and_out.entity";

@Entity({ name: 'vehicles' })
export class Vehicle {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    badge: string

    @Column({ type: 'timestamp', nullable: true })
    dateOfEntry: Date

    @Column({ type: 'timestamp', nullable: true })
    dateOfOut: Date

    @ManyToOne(()=>Person, person=>person.vehicles)
    @JoinColumn()
    person: Person

    @ManyToOne(() => VehicleType, tipo => tipo.vehicle, {
        cascade: true,
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'vehicleType'})
    vehicleType: VehicleType

    @ManyToOne(()=>Record_entry,recordEntry=>recordEntry.vehicleEntry)
    @JoinColumn()
    recordEntry: Record_entry[]

    // @OneToMany(()=>EntryVehicle,entryVehicle=>entryVehicle.vehicle)
    // entryVehicle: EntryVehicle[]
}