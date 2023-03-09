import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SlackService {
  constructor(private httpService: HttpService) {}

  async sendMessage(channel: string, text: string) {
    const result = await firstValueFrom(
      this.httpService.post(
        'https://slack.com/api/chat.postMessage',
        {
          channel,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
          },
        },
      ),
    );

    if (!result.data.ok) {
      console.log('[ERR] Axios Error');
    }
  }
}
