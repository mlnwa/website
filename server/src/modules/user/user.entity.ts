import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { BaseEntity } from 'src/base/base.entity';
import { RoleEntity } from '../role/role.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 10 })
  name: string;

  @Column('varchar')
  password: string;

  @Column({ default: 1 })
  status: number;

  @Column('varchar')
  uid: string;

  @Column({ length: 20, default: '' })
  email: string;

  @Column({ default: '' })
  phone: string;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  role: RoleEntity[];
}
