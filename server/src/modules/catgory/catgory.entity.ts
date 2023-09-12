import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BlogEntity } from '../blog/blog.entity';

@Entity({ name: 'catgory' })
export class CatgoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  name: string;

  @Column('varchar')
  description: string;

  @CreateDateColumn({
    type: 'datetime',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updateAt: Date;

  @OneToMany(() => BlogEntity, (blog) => blog.catgory)
  blogs: BlogEntity[];
}
