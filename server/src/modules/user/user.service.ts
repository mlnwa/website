import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ResultModel } from 'src/common/result/ResultModel';

export class UserService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    //   .getRepository(User)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.blog', 'blog')
    //   .getMany();
  }

  async findByUserName(name:string):Promise<ResultModel>{
    const result = await this.userRepository.findOne({
      where:{name}
    })
    return ResultModel.builderSuccess().setResult(result)
  }

  async create(user): Promise<User[]> {
    const { name } = user;
    const isFound = this.userRepository.findOne({
        where:{name}
    })
    if(isFound){

    }
    return this.userRepository.save(user);
  }
}
