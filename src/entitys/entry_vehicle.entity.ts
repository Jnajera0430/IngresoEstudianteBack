import { Record_entry } from "src/entitys/record_entry_and_out.entity";
import { Vehicle } from "src/entitys/vehicle.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'RecordVehicle' })
export class RecordVehicle {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    inside: boolean;

    @Column({ nullable: true })
    out: boolean;

    @Column({ type: "timestamp", nullable: true })
    dateEntry: Date;

    @Column({ type: "timestamp", nullable: true })
    dateExit: Date;

    @ManyToOne(() => Vehicle, vehicle => vehicle, {
        eager: false,
        nullable: true
    })
    @JoinColumn({ name: 'idVehicle' })
    idVehicle: number;

    @ManyToOne(() => Record_entry, recordEntry => recordEntry.idRecordVehicle, {
        eager: false,
        nullable: true
    })
    @JoinColumn({name: "idRecord"})
    idRecord: number
}