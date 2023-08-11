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

@Entity()
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  user: UserEntity;

  @CreateDateColumn({ 
    type: 'datetime',
    //  default:  'CURRENT_TIMESTAMP' 
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    // default: 'CURRENT_TIMESTAMP',
    // onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
