import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./vehicle.entity";

@Entity({name: 'vehicle_type'})
export class VehicleType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    vendor: string

    @OneToMany(()=>Vehicle,vehicle=>vehicle.vehicleType)
    @JoinColumn()
    vehicle: Vehicle

    @Column({ nullable: true })
    icon: string
}