import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirthModule } from './birth/birth.module';
import { SlackModule } from './slack/slack.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [BirthModule, SlackModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
