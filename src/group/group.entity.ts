import { Career } from "src/career/career.entity";
import { Person } from "src/person/person.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'group' })

export class Group {

    @PrimaryGeneratedColumn('uuid')
    id: String
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