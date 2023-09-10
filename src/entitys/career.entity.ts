import { Group } from "src/entitys/group.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'careers' })
export class Career {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @OneToMany(()=>Group,group=>group.career)
    @JoinColumn()
    groups: Group[]
}