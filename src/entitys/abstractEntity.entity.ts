import { Exclude } from "class-transformer";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class AbstractEntity {
  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;
}