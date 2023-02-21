import { Module } from '@nestjs/common';
import { BirthService } from './birth.service';
import { BirthController } from './birth.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BirthController],
  providers: [BirthService, PrismaService],
})
export class BirthModule {}
