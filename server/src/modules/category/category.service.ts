import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesCategoryDto } from './dto/query-category.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';
import { CategoryRepository } from './category.repository';
import { CategoryVo } from './vo/category.vo';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const isFound = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });
    if (isFound) {
      return ResultModel.builderErrorMsg(`类别：${name}已存在`);
    }
    await this.categoryRepository.save(createCategoryDto);
    return ResultModel.builderSuccessMsg('新建成功');
  }

  async queryPages(queryPagesCategoryDto: QueryPagesCategoryDto) {
    const { pageIndex, pageSize } = queryPagesCategoryDto;
    const resultModel = new ResultModel<PageInfo<CategoryVo>>();
    const pageInfo = new PageInfo<CategoryVo>({
      ...(await this.categoryRepository.findList(queryPagesCategoryDto)),
      pageIndex,
      pageSize,
    });
    resultModel.setSuccess(true);
    resultModel.setResult(pageInfo);
    return resultModel;
  }

  async findByName(name: string) {
    const res = await this.categoryRepository.findOne({ where: { name: name } });
    if (res !== null) return ResultModel.builderSuccess<CategoryEntity>().setResult(res);
    return ResultModel.builderErrorMsg('分类不存在');
  }

  async deleteById(id: number) {
    let res = await this.categoryRepository.delete(id);
    if (res.affected == 0) return ResultModel.builderErrorMsg('分类不存在');
    return ResultModel.builderSuccessMsg('删除成功');
  }
  async findById(id: number) {
    const result = await this.categoryRepository.findOne({ where: { id } });
    if (result == null) {
      return ResultModel.builderErrorMsg('分类不存在');
    }
    return ResultModel.builderSuccess<CategoryEntity>().setResult(result);
  }
  async update(id: number, category: Partial<CategoryEntity>) {
    const queryCategory = await this.findById(id);
    if (queryCategory == null) return ResultModel.builderErrorMsg('分类不存在');
    await this.categoryRepository.update(id, category);
    return ResultModel.builderSuccessMsg('更新成功');
  }
}
