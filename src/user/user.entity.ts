import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'users'
})
export class Users{
    @PrimaryGeneratedColumn('increment')
    id: bigint
    @Column({unique: true})
    email: string
    @Column()
    username: string
    @Column()
    password: string
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
}