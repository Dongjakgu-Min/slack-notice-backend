import { Injectable } from '@nestjs/common';
import { CreateSlackDto } from './dto/create-slack.dto';
import { UpdateSlackDto } from './dto/update-slack.dto';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';

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

  @Cron('0 0 11 * * *', {
    timeZone: 'Asia/Seoul',
  })
  async notice() {
    const day = await this.prisma.birthday.findMany({
      where: {
        birthday: new Date(),
      },
    });

    for (const d of day) {
      await this.httpService.post(
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
      );
    }
  }
}
