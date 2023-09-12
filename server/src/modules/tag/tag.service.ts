import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: Repository<TagEntity>) {}

  async findById() {}

  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const isFound = this.tagRepository.findOne({
      where: { name },
    });
    if (isFound) {
      return ResultModel.builderErrorMsg(`tag:${name}已存在`);
    }
    this.tagRepository.save(createTagDto);
    return ResultModel.builderSuccessMsg('新增成功');
  }

  async queryPages(queryPagesTagDto: QueryPagesTagDto): Promise<PageModel<TagEntity>> {
    const result = await SelectPage.paginate<TagEntity>(this.tagRepository, queryPagesTagDto);
    return ResultModel.builderSuccess<PageInfo<TagEntity>>().setResult(result);
  }
}
