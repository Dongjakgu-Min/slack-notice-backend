import { Injectable } from '@nestjs/common';
import { CreateSlackDto } from './dto/create-slack.dto';
import { UpdateSlackDto } from './dto/update-slack.dto';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SlackService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  create(createSlackDto: CreateSlackDto) {
    return 'This action adds a new slack';
  }

  findAll() {
    return `This action returns all slack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slack`;
  }

  update(id: number, updateSlackDto: UpdateSlackDto) {
    return `This action updates a #${id} slack`;
  }

  remove(id: number) {
    return `This action removes a #${id} slack`;
  }

  @Cron('30 * * * * *', {
    timeZone: 'Asia/Seoul',
  })
  async notice() {
    const today = new Date();
    const day: any = await this.prisma
      .$queryRaw`SELECT * FROM Birthday WHERE (DATE_FORMAT(birthday, '%m')=${(
      '0' + (today.getMonth() + 1).toString()
    ).slice(-2)} AND DATE_FORMAT(birthday, '%d')=${(
      '0' + today.getDate().toString()
    ).slice(-2)})`;

    for (const d of day) {
      const result = await firstValueFrom(
        this.httpService.post(
          'https://slack.com/api/chat.postMessage',
          {
            channel: process.env.CHANNEL_NAME,
            text: `오늘은 ${d.name} 청년의 생일입니다. 모두 축하해주세요!`,
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
}
