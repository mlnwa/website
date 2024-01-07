import { DataSource, EntityTarget, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';

export class BaseRepository<E extends ObjectLiteral> extends Repository<E> {
  constructor(dataSouce: DataSource, entity: EntityTarget<E>) {
    super(entity, dataSouce.createEntityManager());
  }
  async loadQueryBuilderToPages<R>(queryBuilder: SelectQueryBuilder<E>, pageIndex: number, pageSize: number) {
    const total = await queryBuilder.getCount();
    const offset = pageSize * (pageIndex - 1);
    let list: R[] = [];
    if (offset < total) {
      list = await queryBuilder.offset(offset).limit(pageSize).getRawMany();
    }
    return { list, total };
  }
}
