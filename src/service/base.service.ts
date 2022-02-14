import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, getManager } from 'typeorm';
import { validate } from 'class-validator';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {
  private entity;
  public relations;
  public logUser = false;

  constructor(entity, public auth: AuthService) {
    this.entity = entity;
  }

  async create(model: DeepPartial<any>): Promise<any> {
    const manager = await getManager();
    try {
      const transaction = await manager.transaction(async (transaction) => {
        const entity = Object.assign(new this.entity(), model);
        const errors = await validate(entity);
        if (errors.length) {
          throw new BadRequestException(`Validation failed!`);
        }

        if (this.logUser && this.auth) {
          entity.createdBy = this.auth.user;
        }

        return await transaction.save(entity);
      });

      return transaction;
    } catch (e) {
      return e.stack;
    }
  }

  async list(): Promise<any> {
    const manager = await getManager();
    try {
      return await manager.find(this.entity);
    } catch (e) {
      return e.stack;
    }
  }

  async get(id): Promise<any> {
    const manager = await getManager();
    try {
      return await manager.findOne(this.entity, { id , relations: this.relations });
    } catch (e) {
      return e.stack;
    }
  }

  async update(model, id): Promise<any> {
    const manager = await getManager();
    try {
      const transaction = await manager.transaction(async (transaction) => {
        const entity = Object.assign(new this.entity(), model);
        const errors = await validate(entity);
        if (errors.length) {
          throw new BadRequestException(`Validation failed!`);
        }
        if (this.logUser && this.auth) {
          entity.updatedBy = this.auth.user;
        }

        return await transaction.update(this.entity, id, entity);
      });

      return transaction;
    } catch (e) {
      return e.stack;
    }
  }

  async delete(id): Promise<any> {
    const manager = await getManager();
    try {
      const reg = await this.get(id);
      if (this.logUser && this.auth) {
        reg.deletedBy = this.auth.user;
        this.update(reg, id);
      }
      return await manager.softRemove(this.entity, reg);
    } catch (e) {
      return e.stack;
    }
  }
}
