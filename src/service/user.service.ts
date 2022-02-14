import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, getManager, Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt-nodejs';
import { UserEntity } from '../entity/user.entity';
import { UserDto } from '../dto/userDto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    const users = await this.userRepository.count();

    if (!users) {
      console.log('Admin user not found, creating...');

      await this.create(
        Object.assign(new UserDto(), {
          email: 'admin@test.com.br',
          password: 'test@2022',
          passwordConfirm: 'test@2022',
          firstName: 'Admin',
          lastName: 'User'
        })
      );
    }
  }

  findOne(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneWithPassword(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'firstName', 'lastName', 'password']
    });
  }

  async create(model: DeepPartial<UserDto>): Promise<any> {
    const entity = Object.assign(new UserEntity(), model);
    entity.salt = genSaltSync();

    if (model.password !== model.passwordConfirm)
      throw new BadRequestException('password mismatch');

    entity.password = hashSync(entity.password, entity.salt);
    const user = await this.userRepository.save(entity);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

  async list(): Promise<any> {
    const manager = await getManager();
    const users = await manager.getRepository(UserEntity).find();
    return users;
  }

  update(model: UserEntity): Promise<any> {
    return this.userRepository.update(model.id, {
      firstName: model.firstName,
      lastName: model.lastName,
      email: model.email
    });
  }

  updatePassword(id: number, password: string) {
    const salt = genSaltSync();
    password = hashSync(password, salt);
    return this.userRepository.update(id, { password, salt });
  }
}
