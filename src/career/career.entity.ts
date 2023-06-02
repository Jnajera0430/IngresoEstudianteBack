import { group } from "console";
import { Group } from "src/group/group.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'career' })
export class Career {
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    name: string

    @OneToMany(() => Group, group => group.career)
    groups: Group[]
}