import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @ManyToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
