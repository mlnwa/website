import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column('varchar')
  password: string;

  @Column()
  status: boolean;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @CreateDateColumn({ 
    type: 'datetime', 
    // default: 'CURRENT_TIMESTAMP' 
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    // default:'CURRENT_TIMESTAMP',
    // onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
