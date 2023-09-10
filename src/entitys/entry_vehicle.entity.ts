import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'entry_vehicle' })
export class EntryVehicle {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    inside: boolean

    @Column({ type: 'timestamp', nullable: true })
    out: Date

    @ManyToOne(() => Vehicle, vehicle => vehicle, {
        cascade: true,
        eager: true,
        nullable: true
    })
    @JoinColumn({ name: 'vehicle' })
    vehicle: Vehicle

    @OneToOne(()=>Record_entry,recordEntry=>recordEntry.vehicleEntry)
    @JoinColumn()
    recordEntry: Record_entry
}