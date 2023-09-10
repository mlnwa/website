import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { PageModel, ResultModel } from 'src/common/result/ResultModel';
import { FindManyOptions, Repository } from 'typeorm';
import { PageInfo } from './PageInfo';

type Condition<E> = FindManyOptions<E> & {
  pageIndex: number;
  pageSize: number;
};

export class SelectPage {
  constructor() {}
  static async paginate<E>(entity: Repository<E>, condition: Condition<E>): Promise<PageInfo<E>>;

  static async paginate<E>(entity: Repository<E>, condition: Condition<E>): Promise<PageInfo<E>> {
    const { pageIndex, pageSize: take, ...otherConditions } = condition;
    const count: number = await entity.count(otherConditions);
    const skip = (pageIndex - 1) * take;
    const pageInfo = new PageInfo<E>();
    let result: E[] = [];
    if (skip < count) {
      result = await entity.find({
        skip,
        take,
        ...otherConditions,
      });
    }
    pageInfo.setList(result);
    pageInfo.setSize(result.length);
    pageInfo.setTotal(count);
    pageInfo.setPages(Math.ceil(count / take));
    pageInfo.setPageIndex(condition.pageIndex);
    pageInfo.setPageSize(condition.pageSize);
    pageInfo.setIsFirstPage(condition.pageIndex == 1);
    pageInfo.setIsLastPage(pageIndex * take >= count);
    pageInfo.setHasPrePage(pageIndex > 1 && count > 0);
    pageInfo.setHasNextPage(skip + take < count);
    return pageInfo;
  }
}
