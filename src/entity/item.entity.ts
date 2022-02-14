import { IsNotEmpty, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { BoxEntity } from './box.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Min(1)
  @Column()
  quantity: number;

  @Column('decimal', { precision: 13, scale: 2 })
  price: number;

  @ManyToOne((type) => BoxEntity, (box) => box.items, { onDelete: 'CASCADE' })
  box: BoxEntity;

  @CreateDateColumn({ select: false })
  public createdAt: Date;

  @UpdateDateColumn({ select: false })
  public updatedAt: Date;

  @DeleteDateColumn({ select: false })
  public deletedAt: Date;
}
