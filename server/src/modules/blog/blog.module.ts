import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogEntity]), UserModule, CategoryModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
