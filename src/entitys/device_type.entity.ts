import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";

@Entity({name:'device_type'})
export class DeviceType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    brand: string

    device: Device

}
