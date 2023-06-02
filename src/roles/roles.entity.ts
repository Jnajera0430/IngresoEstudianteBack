import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    tipo:String

}