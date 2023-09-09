import { Career } from "src/entitys/career.entity";
import { Person } from "src/entitys/person.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity({ name: 'groups' })

export class Group {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column({ unique: true })
    code: number
    @Column({ type: 'date' })
    dateStart: Date
    @Column({ type: 'date' })
    dateEnd: Date
    @Column({ default: true, })
    state: boolean

    @ManyToOne(() => Career,{
        cascade: true,
        eager: true,
        nullable: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    career: Career

    @ManyToMany(() => Person, {
        nullable: true
    })
    @JoinTable()
    people: Person[]

}