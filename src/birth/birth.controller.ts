import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BirthService } from './birth.service';
import { Prisma } from '@prisma/client';

@Controller('birth')
export class BirthController {
  constructor(private readonly birthService: BirthService) {}

  @Post()
  create(@Body() data: Prisma.BirthdayCreateInput) {
    return this.birthService.create(data);
  }

  @Get()
  findAll(@Query('day') day: string) {
    return day
      ? this.birthService.findAllByDate(new Date(day))
      : this.birthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.birthService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBirthDto: Prisma.BirthdayUpdateInput,
  ) {
    return this.birthService.update({ id: +id }, updateBirthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.birthService.remove(+id);
  }
}
