import { Injectable } from '@nestjs/common';
import { BoxEntity } from '../entity/box.entity';
import { BaseService } from './base.service';
import { DeepPartial } from 'typeorm';
import { ItemService } from './item.service';
import { ItemEntity } from '../entity/item.entity';
import { AuthService } from './auth.service';

@Injectable()
export class BoxService extends BaseService {
  public relations = ['items', 'createdBy', 'updatedBy'];
  public logUser = true;

  constructor(auth: AuthService) {
    super(BoxEntity, auth);
  }

  async create(model: DeepPartial<any>): Promise<any> {
    let boxId;
    await super.create(model).then(async (box) => {
      boxId = box.id;
      for (const item of model.items) {
        const itemService = new ItemService(this.auth);
        const boxItem = Object.assign(new ItemEntity(), item);
        boxItem.box = box;
        await itemService.create(boxItem);
      }
    });

    return boxId;
  }

  async update(data, id): Promise<any> {
    let items = [];
    if (data.items) {
      items = [...data.items];
      delete data.items;
    }
    await super.update(data, id).then(async () => {
      if (items.length > 0)
        for (let item of items) {
          const itemService = new ItemService(this.auth);
          const boxItem = Object.assign(new ItemEntity(), item);
          boxItem.box = data;
          if (boxItem.id) {
            item = await itemService.update(boxItem, item.id);
          } else {
            item = await itemService.create(boxItem);
          }
        }
    });
    data.items = items;
    return data;
  }
}
