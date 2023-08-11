import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';

export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAll(): Promise<ResultModel> {
    // try {
      const result = await this.userRepository.find({
        relations:['blogs']
      })
      return ResultModel.builderSuccess().setResult(result)
    // } catch (error) {
    //   return ResultModel.builderErrorDesc(error.message)
    // }
    // return await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.blog', 'blog')
    //   .getMany();
  }

  async create(user): Promise<UserEntity[]> {
    const { name } = user;
    const isFound = this.userRepository.findOne({
        where:{name}
    })
    if(isFound){

    }
    return this.userRepository.save(user);
  }
}
