import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column({ length: 10 })
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @OneToMany(() => BlogEntity, (blog) => blog.category)
  blogs: BlogEntity[];
}
