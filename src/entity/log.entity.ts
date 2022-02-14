import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entity: string;

  @Column()
  action: string;

  @Column()
  user: string;

  @Column({ type: 'json', nullable: true })
  data: string;
}
