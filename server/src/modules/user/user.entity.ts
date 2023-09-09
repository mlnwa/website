import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('varchar')
  password: string;

  @Column({ default: 1 })
  status: number;

  @OneToMany(() => BlogEntity, (blog) => blog.user)
  blogs: BlogEntity[];

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_at',
  })
  updateAt: Date;
}
