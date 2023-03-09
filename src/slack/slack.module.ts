import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackModule as SlackLibModule } from '@lib/slack';
import { SlackController } from './slack.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SlackController],
  providers: [SlackService, PrismaService],
  imports: [HttpModule, SlackLibModule],
})
export class SlackModule {}
