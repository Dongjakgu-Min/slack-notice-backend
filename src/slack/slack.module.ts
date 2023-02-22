import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SlackController],
  providers: [SlackService, PrismaService],
  imports: [HttpModule],
})
export class SlackModule {}
