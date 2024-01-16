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
import { BaseEntity } from 'src/base/base.entity';

@Entity({ name: 'blog' })
export class BlogEntity extends BaseEntity {
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

  @Column('text')
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

  @Column({
    name: 'view_count',
    default: 0,
  })
  viewCount: number;

  @Column({
    default: '',
  })
  abstract: string;

  @Column({
    name: 'img_url',
    default: '',
  })
  imgUrl: string;

  @Column({
    name: 'enable_copyright',
    default: true,
  })
  enableCopyright: boolean;

  @Column({
    name: 'enable_comment',
    default: true,
  })
  enableComment: boolean;

  @Column({
    name: 'enable_praise',
    default: false,
  })
  enablePraise: boolean;

  @Column({
    name: 'enable_recommend',
    default: false,
  })
  enableRecommend: boolean;
}
