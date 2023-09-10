import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity({name: 'vehicle_type'})
export class VehicleType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    vendor: string
    
    @ManyToOne(()=>Vehicle,vehicle=>vehicle.vehicleType)
    @JoinColumn()
    vehicle: Vehicle
}