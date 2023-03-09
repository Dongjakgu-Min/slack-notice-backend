import { Body, Controller, Post } from '@nestjs/common';
import { SlackService } from './slack.service';
import SlackRequestDto from './dto/request-slack.dto';

@Controller('slack')
export class SlackController {
  constructor(private readonly slackService: SlackService) {}

  @Post('/birthday')
  async createBirthDay(@Body() body: SlackRequestDto) {
    switch (body.command) {
      case '/add_bd':
        return this.slackService.SlackInputBirthday(body);
      case '/remove_bd':
        return this.slackService.SlackDeleteBirthday(body);
      case '/show_bd':
        return this.slackService.SlackFindAllBirthday();
      default:
        return '유효하지 않은 명령입니다.';
    }
  }
}
