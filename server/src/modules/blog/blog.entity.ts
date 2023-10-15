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
import { BlogStatus } from './blog.enum';
import { CatgoryEntity } from '../catgory/catgory.entity';
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
  })
  publishId: number;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.DRAFT,
  })
  status: BlogStatus;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => CatgoryEntity, (catgory) => catgory.blogs)
  @JoinColumn({ name: 'cargory_id', referencedColumnName: 'id' })
  catgory: CatgoryEntity;

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
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    name: 'update_at',
  })
  updateAt: Date;
}
