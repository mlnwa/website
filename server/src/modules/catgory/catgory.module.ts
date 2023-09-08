import { Module } from '@nestjs/common';
import { CatgoryController } from './catgory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatgoryEntity } from './catgory.entity';
import { CatgoryService } from './catgory.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatgoryEntity])],
  controllers: [CatgoryController],
  providers: [CatgoryService],
})
export class CatgoryModule {}
