import { Injectable } from '@nestjs/common';
import { ItemEntity } from '../entity/item.entity';
import { BaseService } from './base.service';
import { AuthService } from './auth.service';
import { BoxEntity } from '../entity/box.entity';

@Injectable()
export class ItemService extends BaseService {
  constructor(auth: AuthService) {
    super(ItemEntity, auth);
  }
}
