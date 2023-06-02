import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('increment')
    id: bigint

    @Column()
    tipo:String

}