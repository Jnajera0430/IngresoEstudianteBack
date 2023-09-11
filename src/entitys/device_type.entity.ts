import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Device } from "./device.entity";

@Entity({name:'device_type'})
export class DeviceType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    brand: string
    
    @OneToMany(()=>Device,device=>device.deviceType)
    @JoinColumn()
    device: Device

}
