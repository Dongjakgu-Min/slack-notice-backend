import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SlackService } from './slack.service';
import { CreateSlackDto } from './dto/create-slack.dto';
import { UpdateSlackDto } from './dto/update-slack.dto';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post()
  create(@Body() createSlackDto: CreateSlackDto) {
    return this.slackService.create(createSlackDto);
  }

  @Get()
  findAll() {
    return this.slackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.slackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlackDto: UpdateSlackDto) {
    return this.slackService.update(+id, updateSlackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slackService.remove(+id);
  }
}
