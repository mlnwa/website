import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import dayjs from 'dayjs';
import { BaseEntity } from 'src/base/base.entity';

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

  @Column({ default: 0 })
  phone: number;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];
}
