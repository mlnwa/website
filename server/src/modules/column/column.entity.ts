import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'column' })
export class ColumnEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @OneToMany(() => BlogEntity, (blog) => blog.column)
  blogs: BlogEntity[];
}
