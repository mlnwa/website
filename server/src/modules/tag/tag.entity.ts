import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ length: 10 })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @ManyToMany(() => BlogEntity, (blog) => blog.tags)
  blogs: BlogEntity[];
}
