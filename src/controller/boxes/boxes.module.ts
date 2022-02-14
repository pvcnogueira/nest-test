import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../../entity/item.entity';
import { BoxService } from '../../service/box.service';
import { BoxesController } from './boxes.controller';
import { AuthModule } from 'src/controller/auth/auth.module';
import { LogEntity } from '../../entity/log.entity';
import { LogSubscriber } from '../log/log.subscriber';
import { BoxEntity } from '../../entity/box.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoxEntity, ItemEntity, LogEntity]), AuthModule],
  providers: [BoxService, LogSubscriber],
  exports: [BoxService],
  controllers: [BoxesController],
})
export class BoxModule {}
