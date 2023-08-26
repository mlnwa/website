import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { BlogStatus } from './blog.enum';

@Entity()
export class Blog {
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

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @CreateDateColumn({ 
    type: 'datetime',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updateAt: Date;
}
