import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BlogFromStatus, BlogStatus } from './blog.enum';
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';
import { ColumnEntity } from '../column/column.entity';

@Entity({ name: 'blog' })
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    name: 'publish_id',
    default: 0,
  })
  publishId: number;

  @Column({
    type: 'tinyint',
    default: BlogStatus.DRAFT,
  })
  status: BlogStatus;

  @Column({
    type: 'tinyint',
    default: BlogFromStatus.SELF,
    name: 'from_status',
  })
  fromStatus: BlogFromStatus;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.blogs)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity;

  @ManyToOne(() => ColumnEntity, (column) => column.blogs)
  @JoinColumn({ name: 'column_id', referencedColumnName: 'id' })
  column: ColumnEntity;

  @ManyToMany(() => TagEntity, (tag) => tag.blogs)
  @JoinTable({
    name: 'blog_tags',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: TagEntity[];

  @CreateDateColumn({
    type: 'datetime',
    name: 'create_at',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    type: 'datetime',
    name: 'update_at',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({
    name: 'view_count',
    default: 0,
  })
  viewCount: number;
}
