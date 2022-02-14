import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { BaseService } from '../service/base.service';

export class BaseController {
  constructor(private service: BaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() model) {
    return this.service.create(model);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.service.list();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Param() params) {
    return this.service.get(Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() model, @Param() params) {
    return this.service.update(model, Number(params.id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() params) {
    return this.service.delete(Number(params.id));
  }
}