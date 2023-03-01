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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateBirthDto from './dto/create-birth.dto';

@ApiTags('Birthday')
@Controller('birth')
export class BirthController {
  constructor(private readonly birthService: BirthService) {}

  @ApiOperation({ summary: 'Create Birthday Information' })
  @ApiBody({ type: CreateBirthDto })
  @Post()
  create(@Body() data: Prisma.BirthdayCreateInput) {
    return this.birthService.create(data);
  }

  @ApiOperation({ summary: 'Get All information about birthday' })
  @Get()
  findAll(@Query('day') day: string) {
    return day
      ? this.birthService.findAllByDate(new Date(day))
      : this.birthService.findAll();
  }

  @ApiOperation({ summary: 'Get specific users information' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.birthService.findOne({ id: +id });
  }

  @ApiOperation({ summary: 'Update specific users information' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBirthDto: Prisma.BirthdayUpdateInput,
  ) {
    return this.birthService.update({ id: +id }, updateBirthDto);
  }

  @ApiOperation({ summary: 'Delete specific user' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.birthService.remove(+id);
  }
}
