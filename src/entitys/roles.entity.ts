import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  tipo: string;

  @ManyToMany(() => User, (user) => user.role, {
    nullable: true,
  })
  @JoinTable()
  users: User[];
}
