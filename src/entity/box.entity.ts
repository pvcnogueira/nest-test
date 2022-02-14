import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ItemEntity } from './item.entity';
import { LogableEntity } from './logable.entity';
import { UserEntity } from './user.entity';

@Entity()
export class BoxEntity extends LogableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: number;

  @OneToMany(() => ItemEntity, (item) => item.box)
  items: ItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.box)
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.box)
  updatedBy: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.box)
  deletedBy: UserEntity;

  @CreateDateColumn({ select: false })
  public createdAt: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt: Date;

  @DeleteDateColumn({ select: false })
  public deletedAt: Date;
}
