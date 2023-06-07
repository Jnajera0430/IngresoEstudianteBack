import { Record_entry } from "src/entitys/record_entry.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'entry_vehicle' })
export class EntryVehicle {
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    inside: boolean

    @Column({ type: 'timestamp' })
    out: Date

    @ManyToOne(()=>Vehicle,vehicle=>vehicle)
    vehicle: Vehicle

    @OneToOne(()=>Record_entry)
    recordEntry: Record_entry
}