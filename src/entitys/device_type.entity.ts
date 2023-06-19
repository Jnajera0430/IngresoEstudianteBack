import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'device_type'})
export class DeviceType{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    brand: string
}
