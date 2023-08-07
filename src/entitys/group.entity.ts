import { Career } from "src/entitys/career.entity";
import { Person } from "src/entitys/person.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'groups' })

export class Group {

    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    code: number
    @Column()
    dateStart: Date
    @Column()
    dateEnd: Date
    @Column()
    state: boolean

    @ManyToOne(() => Career, career => career.groups,{
        cascade: true,
        eager: true,
        nullable: false,
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
    })
    career: Career

    @ManyToMany(()=> Person, person=> person.groups,{
        nullable:true
    })
    @JoinTable()
    students: Person[]

}