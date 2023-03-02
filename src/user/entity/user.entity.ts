import { Column, Entity } from 'typeorm';
import BaseEntity from '../../common/entity/base.entity';

@Entity()
export default class User extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  sex: string;
}
