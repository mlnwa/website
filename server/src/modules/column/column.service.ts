import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ColumnEntity } from './column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';
import { QueryPagesColumnDto } from './dto/query-column.dto';
import { PageInfo, SelectPage } from 'src/lib/panination';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async create(column: Partial<ColumnEntity>) {
    let columnModel = await this.findByName(column.name);
    if (columnModel.getSuccess()) return ResultModel.builderErrorMsg('专栏已存在');
    await this.columnRepository.save(column);
    return ResultModel.builderSuccessMsg('创建成功');
  }

  async findByName(name: string) {
    let res = await this.columnRepository.findOne({ where: { name } });
    if (res == null) return ResultModel.builderErrorMsg('专栏不存在');
    return ResultModel.builderSuccess<ColumnEntity>().setResult(res);
  }

  async findById(id: number) {
    let res = await this.columnRepository.findOne({ where: { id } });
    if (res == null) return ResultModel.builderErrorMsg('专栏不存在');
    return ResultModel.builderSuccess<ColumnEntity>().setResult(res);
  }

  async queryPages(condition: QueryPagesColumnDto) {
    const res = await SelectPage.paginate<ColumnEntity>(this.columnRepository, condition);
    return ResultModel.builderSuccess<PageInfo<ColumnEntity>>().setResult(res);
  }

  async deleteById(id: number) {
    let res = await this.columnRepository.delete(id);
    if (res.affected == 0) return ResultModel.builderErrorMsg('专栏不存在');
    return ResultModel.builderSuccess();
  }

  async update(id: number, column: Partial<ColumnEntity>) {
    const columnModel = await this.findById(id);
    if (!columnModel.getResult()) return ResultModel.builderErrorMsg('专栏不存在');
    await this.columnRepository.update(id, column);
    return ResultModel.builderSuccessMsg('修改成功');
  }
}
