import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './roles.entity';
import { AbstractEntity } from './abstractEntity.entity';

@Entity({
  name: 'users',
})
export class User extends AbstractEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({type: "boolean",default:true,})
  state: boolean;
  
  @ManyToMany(() => Role, (rol) => rol.users, {
    nullable: true,
  })
  @JoinTable({ name: 'user_rol' })
  role: Role[];
}
