import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BirthService } from './birth.service';
import { CreateBirthDto } from './dto/create-birth.dto';
import { UpdateBirthDto } from './dto/update-birth.dto';
import { Prisma } from "@prisma/client";

@Controller('birth')
export class BirthController {
  constructor(private readonly birthService: BirthService) {}

  @Post()
  create(@Body() data: Prisma.BirthdayCreateInput) {
    return this.birthService.create(data);
  }

  @Get()
  findAll() {
    return this.birthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBirthDto: UpdateBirthDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
