import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BirthModule } from './birth/birth.module';
import { SlackModule } from './slack/slack.module';

@Module({
  imports: [BirthModule, SlackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
