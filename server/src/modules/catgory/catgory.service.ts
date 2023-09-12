import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatgoryEntity } from './catgory.entity';
import { Repository } from 'typeorm';
import { CreateCatgoryDto } from './dto/create-catgory.dto';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesCatgoryDto } from './dto/query-catgory.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';

@Injectable()
export class CatgoryService {
  constructor(
    @InjectRepository(CatgoryEntity)
    private readonly catgoryRepository: Repository<CatgoryEntity>,
  ) {}

  async create(createCatgoryDto: CreateCatgoryDto) {
    const { name } = createCatgoryDto;
    const isFound = this.catgoryRepository.findOne({
      where: {
        name,
      },
    });
    if (isFound) {
      return ResultModel.builderErrorMsg(`类别：${name}已存在`);
    }
    this.catgoryRepository.save(createCatgoryDto);
    return ResultModel.builderSuccessMsg('新建成功');
  }

  async queryPages(queryPagesCatgoryDto: QueryPagesCatgoryDto) {
    const result = await SelectPage.paginate<CatgoryEntity>(this.catgoryRepository, queryPagesCatgoryDto);
    return ResultModel.builderSuccess<PageInfo<CatgoryEntity>>().setResult(result);
  }
}
