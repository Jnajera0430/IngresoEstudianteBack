import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity({name: 'vehicle_type'})
export class VehicleType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    vendor: string

    vehicle: Vehicle
}