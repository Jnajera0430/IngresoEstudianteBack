import { Career } from "src/entitys/career.entity";
import { Person } from "src/entitys/person.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'groups' })

export class Group {

    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    code: Number
    @Column()
    dateStart: Date
    @Column()
    dateEnd: Date
    @Column()
    state: Number

    @ManyToOne(() => Career, career => career.id)
    career: Career

    @ManyToOne(()=> Person, person=> person.groups)
    person: Person

}