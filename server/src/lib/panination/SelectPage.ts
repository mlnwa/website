import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { PageInfo } from './PageInfo';

type Condition<E> = FindManyOptions<E> & {
  pageIndex: number;
  pageSize: number;
};

type BuilderCondition<E> = Condition<E> & {
  leftJoins?: {
    type: 'subQueryFactory' | 'property' | 'entity' | 'tableName';
    value: any[];
  }[];
};

type PaginateRes<E> = {
  result: E[];
  count: number;
};

/**
 * @deprecated
 * @todo
 */
export class SelectPage {
  constructor() {}
  static async paginate<E>(entity: Repository<E>, condition: Condition<E>): Promise<PageInfo<E>>;

  static async paginate<E>(
    queryBuilder: SelectQueryBuilder<E>,
    builderCondition: BuilderCondition<E>,
  ): Promise<PageInfo<E>>;

  static async paginate<E>(param1: Repository<E> | SelectQueryBuilder<E>, param2: Condition<E> | BuilderCondition<E>) {
    let result: E[] = [];
    let count: number = 0;
    const { pageIndex, pageSize } = param2;
    if (param1 instanceof Repository) {
      const { result: entityResult, count: entityCount } = await this.paginateByEntity(param1, param2);
      result = entityResult;
      count = entityCount;
    } else if (param1 instanceof SelectQueryBuilder) {
      const { result: queryResult, count: queryCount } = await this.paginateByQueryBuilder(param1, param2);
      result = queryResult;
      count = queryCount;
    }
    const pageInfo = new PageInfo<E>();
    pageInfo.setList(result);
    pageInfo.setSize(result.length);
    pageInfo.setTotal(count);
    pageInfo.setPages(Math.ceil(count / pageSize));
    pageInfo.setPageIndex(pageIndex);
    pageInfo.setPageSize(pageSize);
    pageInfo.setIsFirstPage(pageIndex == 1);
    pageInfo.setIsLastPage(pageIndex * pageSize >= count);
    pageInfo.setHasPrePage(pageIndex > 1 && count > 0);
    pageInfo.setHasNextPage(pageIndex * pageSize < count);
    return pageInfo;
  }
  private static async paginateByEntity<E>(entity: Repository<E>, condition: Condition<E>): Promise<PaginateRes<E>> {
    const { pageIndex, pageSize: take, ...otherConditions } = condition;
    const count: number = await entity.count(otherConditions);
    const skip = (pageIndex - 1) * take;
    let result: E[] = [];
    if (skip < count) {
      result = await entity.find({
        skip,
        take,
        ...otherConditions,
      });
    }
    return { result, count };
  }

  private static async paginateByQueryBuilder<E>(
    queryBuilder: SelectQueryBuilder<E>,
    builderCondition: BuilderCondition<E>,
  ) {
    const { pageIndex, pageSize: take, ...otherConditions } = builderCondition;
    const skip = (pageIndex - 1) * take;
    this.loadLeftJoins(queryBuilder, otherConditions.leftJoins);
    const count: number = await queryBuilder.getCount();
    queryBuilder.skip(skip).take(take);
    let result: E[] = [];
    if (skip < count) {
      result = await queryBuilder.getMany();
    }
    return { result, count };
  }

  private static loadLeftJoins<E>(
    queryBuilder: SelectQueryBuilder<E>,
    leftJoins: BuilderCondition<E>['leftJoins'],
  ): void {
    if (!(leftJoins?.length > 0)) return;
    leftJoins.forEach((join) => {
      const [alias, condition, parameters] = join.value.slice(1);
      switch (join.type) {
        case 'subQueryFactory':
          queryBuilder.leftJoin(
            (qb: SelectQueryBuilder<E>) => qb.select(join.value[0]).from(join.value[1], alias),
            alias,
            condition,
            parameters,
          );
          break;
        case 'property':
          queryBuilder.leftJoin(join.value[0], alias, condition, parameters);
          break;
        case 'entity':
          queryBuilder.leftJoin(join.value[0], alias, condition, parameters);
          break;
        case 'tableName':
          queryBuilder.leftJoin(join.value[0], alias, condition, parameters);
          break;
        default:
          throw new Error('Invalid join type');
      }
    });
  }
}
