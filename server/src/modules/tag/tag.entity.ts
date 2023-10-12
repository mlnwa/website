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

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updataAt: Date;

  @CreateDateColumn({
    type: 'datetime',
  })
  createAt: Date;

  @ManyToMany(() => BlogEntity, (blog) => blog.tags)
  blogs: BlogEntity[];
}
