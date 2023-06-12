import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'roles'})
export class Roles{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({unique: true})
    tipo:string

}