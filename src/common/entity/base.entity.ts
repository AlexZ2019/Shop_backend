import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  created_at: Date;
}
