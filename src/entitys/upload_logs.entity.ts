import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from 'typeorm';
  import { User } from './user.entity';

  @Entity({ name: 'upload_logs' })
  export class UploadLogs {
    @PrimaryGeneratedColumn('increment')
    id: number;

    // nombre del archivo
    @Column()
    name: string;

    @Column()
    tipo: string;

    // relacion con el id del usuario un usuario puede generar muchos logs pero un log solo puede ser generado por un usuario
    @ManyToOne(() => User, user => user.id, {
        nullable: true,
        eager: false,
        onUpdate: 'CASCADE'
    })
    user: User;


    // fecha de creacion del log
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;




  }
