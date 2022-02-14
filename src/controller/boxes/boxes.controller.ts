import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BoxService } from '../../service/box.service';
import { BaseController } from '../base.controller';

@Controller('box')
@ApiTags('box')
@ApiBearerAuth()
export class BoxesController extends BaseController {
  constructor(service: BoxService) {
    super(service);
  }
}
