import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { BlogStatus } from './blog.enum';
import { CatgoryEntity } from '../catgory/catgory.entity';

@Entity()
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type:'enum',
    enum:BlogStatus,
    default:BlogStatus.DRAFT
  })
  status:BlogStatus

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  user: UserEntity;

  @ManyToOne(() => CatgoryEntity,(catgory) => catgory.blogs)
  catgory: CatgoryEntity

  @CreateDateColumn({ 
    type: 'datetime',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updateAt: Date;
}
