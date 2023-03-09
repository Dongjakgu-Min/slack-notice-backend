import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { CalendarKorean } from 'date-chinese';
import { SlackService as SlackLibService } from '@lib/slack';
import SlackRequestDto from './dto/request-slack.dto';

@Injectable()
export class SlackService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private slackLibService: SlackLibService,
  ) {}

  @Cron('0 0 10 * * *', {
    timeZone: 'Asia/Seoul',
  })
  async notice() {
    const today = new Date();
    const lunar = new CalendarKorean();
    const lunarToday = lunar.fromDate(today);

    const day: any = await this.prisma
      .$queryRaw`SELECT * FROM Birthday WHERE (DATE_FORMAT(birthday, '%m')=${(
      '0' + (today.getMonth() + 1).toString()
    ).slice(-2)} AND DATE_FORMAT(birthday, '%d')=${(
      '0' + today.getDate().toString()
    ).slice(-2)} AND isLunar=false)`;

    // CalendarKorean의 get 메소드는 [cycle, year, month, leap, day] 순으로 출력
    // 우리가 필요한 건 month와 day이므로 그 부분만 추출해서 사용
    const dayLunar: any = await this.prisma
      .$queryRaw`SELECT * FROM Birthday WHERE (DATE_FORMAT(birthday, '%m')=${(
      '0' + lunarToday.get()[2]
    ).slice(-2)} AND DATE_FORMAT(birthday, '%d')=${(
      '0' + lunarToday.get()[4]
    ).slice(-2)} AND isLunar=false)`;

    const birthday = [...day, ...dayLunar];

    for (const d of birthday) {
      await this.slackLibService.sendMessage(
        process.env.CHANNEL_NAME,
        `오늘은 ${d.name} 청년의 생일입니다. 모두 축하해주세요!`,
      );
    }
  }

  async SlackInputBirthday(slackRequestDto: SlackRequestDto) {
    const command = slackRequestDto.text.split(' ');

    if (command.length < 2) {
      return '잘못된 입력입니다.';
    }

    await this.prisma.birthday.create({
      data: {
        name: command[0],
        birthday: new Date(command[1]),
        isLunar: command[2] && command[2] === 'true',
      },
    });

    return `추가되었습니다.\n(${command[0]}, ${command[1]}, ${
      command[2] === 'true' ? '음력' : '양력'
    })`;
  }

  async SlackFindAllBirthday() {
    const data = await this.prisma.birthday.findMany({
      where: {
        isDeleted: false,
      },
    });

    let result = '전체 교인 명단입니다.\n\n';

    for (const d of data) {
      result += `${d.name} ${(
        '0' + (d.birthday.getMonth() + 1).toString()
      ).slice(-2)}-${('0' + d.birthday.getDate().toString()).slice(-2)} (${
        d.isLunar ? '음력' : '양력'
      }) \n`;
    }

    return result;
  }

  async SlackDeleteBirthday(slackRequestDto: SlackRequestDto) {
    const command = slackRequestDto.text.split(' ');
    const user = await this.prisma.birthday.findFirst({
      where: {
        name: command[0],
        birthday: command[1],
      },
    });

    if (!user) return '사용자가 존재하지 않습니다.';

    await this.prisma.birthday.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: user.id,
      },
    });

    return `${user.name} ${(
      '0' + (user.birthday.getMonth() + 1).toString()
    ).slice(-2)}-${('0' + user.birthday.getDate().toString()).slice(
      -2,
    )} 이(가) 삭제되었습니다. \n`;
  }
}
