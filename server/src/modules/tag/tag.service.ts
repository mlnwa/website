import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { TagEntity } from './tag.entity';
import { QueryPagesTagDto } from './dto/query-tag.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { TagVo } from './vo/tag.vo';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async findById() {}

  async create(createTagDto: CreateTagDto) {
    const tagModel = await this.findByName(createTagDto.name);
    if (tagModel.getSuccess()) return ResultModel.builderErrorMsg(`tag:${createTagDto.name}已存在`);
    this.tagRepository.save(createTagDto);
    return ResultModel.builderSuccessMsg('新增成功');
  }

  async findByName(name: string) {
    const res = await this.tagRepository.findOne({ where: { name } });
    if (res !== null) return ResultModel.builderSuccess<TagEntity>().setResult(res);
    return ResultModel.builderErrorMsg('标签不存在');
  }

  async queryPages(queryPagesTagDto: QueryPagesTagDto): Promise<PageModel<TagVo>> {
    const { pageIndex, pageSize } = queryPagesTagDto;
    const resultModel = new ResultModel<PageInfo<TagVo>>();
    const pageInfo = new PageInfo<TagVo>({
      ...(await this.tagRepository.findList(queryPagesTagDto)),
      pageIndex,
      pageSize,
    });
    resultModel.setSuccess(true);
    resultModel.setResult(pageInfo);
    return resultModel;
  }
  async deleteById(id: number) {
    const res = await this.tagRepository.delete({ id });
    if (res.affected == 0) return ResultModel.builderErrorMsg(`标签不存在`);
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, tag: Partial<TagEntity>) {
    const queryTag = await this.findByName(tag.name);
    if (!queryTag.getResult()) return ResultModel.builderErrorMsg('标签不存在');
    let res = await this.tagRepository.update(id, tag);
    return ResultModel.builderSuccessMsg('修改成功');
  }
  async findByIds(ids: number[]): Promise<ResultModel<TagEntity[]>> {
    const res = await this.tagRepository.findBy({ id: In(ids) });
    if (res.length == 0) return ResultModel.builderErrorMsg('标签不存在');
    return ResultModel.builderSuccess<TagEntity[]>().setResult(res);
  }
}
