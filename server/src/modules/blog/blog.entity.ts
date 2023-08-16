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

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

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
