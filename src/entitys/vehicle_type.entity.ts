import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'vehicle_type'})
export class VehicleType{
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    vendor: string
}