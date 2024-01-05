import { DataSource, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export class BaseRepository<E extends ObjectLiteral> extends Repository<E> {
  constructor(dataSouce: DataSource, entity: EntityTarget<E>) {
    super(entity, dataSouce.createEntityManager());
  }
  async loadQueryBuilderToPages<R>(queryBuilder: SelectQueryBuilder<E>, pageIndex: number, pageSize: number) {
    const total = await queryBuilder.getCount();
    const skip = pageSize * (pageIndex - 1);
    let list: R[] = [];
    if (skip < total) {
      list = await queryBuilder.skip(skip).take(pageSize).getRawMany();
    }
    return { list, total };
  }
}
