import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('uuid',{name: 'id'})
    id: string

    @Column()
    tipo:String

}