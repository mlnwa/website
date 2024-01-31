import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { RoleEntity } from '../role/role.entity';

@Entity('permission')
export class PermissionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];
}
