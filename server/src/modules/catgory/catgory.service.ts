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
    const isFound = await this.catgoryRepository.findOne({
      where: {
        name,
      },
    });
    if (isFound) {
      return ResultModel.builderErrorMsg(`类别：${name}已存在`);
    }
    await this.catgoryRepository.save(createCatgoryDto);
    return ResultModel.builderSuccessMsg('新建成功');
  }

  async queryPages(queryPagesCatgoryDto: QueryPagesCatgoryDto) {
    const result = await SelectPage.paginate<CatgoryEntity>(this.catgoryRepository, queryPagesCatgoryDto);
    return ResultModel.builderSuccess<PageInfo<CatgoryEntity>>().setResult(result);
  }

  async findByName(name: string) {
    const res = await this.catgoryRepository.findOne({ where: { name } });
    if (res !== null) return ResultModel.builderSuccess<CatgoryEntity>().setResult(res);
    return ResultModel.builderErrorMsg('分类不存在');
  }

  async deleteById(id: number) {
    let res = await this.catgoryRepository.delete(id);
    if (res.affected == 0) return ResultModel.builderErrorMsg('分类不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }

  async update(id: number, catgory: Partial<CatgoryEntity>) {
    const queryCatgory = await this.findByName(catgory.name);
    if (queryCatgory.getSuccess()) return ResultModel.builderErrorMsg('分类已存在');
    await this.catgoryRepository.update(id, catgory);
    return ResultModel.builderSuccessMsg('更新成功');
  }
}
