import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoxEntity } from './box.entity';
import { ItemEntity } from './item.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column({ name: 'is_active', select: false, default: true })
  isActive: boolean;

  @OneToMany(() => BoxEntity, (box) => box.createdBy)
  box: BoxEntity;
}
