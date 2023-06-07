import { Group } from "src/entitys/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'careers' })
export class Career {
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    name: string

    @OneToMany(() => Group, group => group.career)
    groups: Group[]
}