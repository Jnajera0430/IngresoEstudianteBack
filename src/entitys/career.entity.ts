import { Group } from "src/entitys/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'careers' })
export class Career {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    groups: Group[]
}