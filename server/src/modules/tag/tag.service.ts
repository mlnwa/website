import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

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

  async findByName(name: string) {
    const res = await this.tagRepository.findOne({ where: { name } });
    if (!res) return ResultModel.builderSuccess<TagEntity>().setResult(res);
    return ResultModel.builderErrorMsg('标签不存在');
  }

  async queryPages(queryPagesTagDto: QueryPagesTagDto): Promise<PageModel<TagEntity>> {
    const result = await SelectPage.paginate<TagEntity>(this.tagRepository, queryPagesTagDto);
    return ResultModel.builderSuccess<PageInfo<TagEntity>>().setResult(result);
  }
  async deleteById(id: number) {
    const res = await this.tagRepository.delete({ id });
    if (res.affected == 0) return ResultModel.builderErrorMsg(`标签不存在`);
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, tag: Partial<TagEntity>) {
    const queryTag = await this.findByName(tag.name);
    if (queryTag.getResult()) return ResultModel.builderErrorMsg('标签已存在');
    let res = await this.tagRepository.update(id, tag);
    return ResultModel.builderSuccessMsg('修改成功').setResult(res);
  }
}
