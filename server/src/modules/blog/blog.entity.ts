import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BlogStatus } from './blog.enum';
import { CatgoryEntity } from '../catgory/catgory.entity';

@Entity({ name: 'blog' })
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.DRAFT,
  })
  status: BlogStatus;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CatgoryEntity, (catgory) => catgory.blogs)
  @JoinColumn({ name: 'cargory_id' })
  catgory: CatgoryEntity;

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
