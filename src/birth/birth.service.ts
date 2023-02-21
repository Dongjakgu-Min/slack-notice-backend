import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BirthService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BirthdayCreateInput) {
    return this.prisma.birthday.create({
      data: { ...data, birthday: new Date(data.birthday) },
    });
  }

  async findAll() {
    return this.prisma.birthday.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async findOne(unique: Prisma.BirthdayWhereUniqueInput) {
    return this.prisma.birthday.findUnique({
      where: unique,
    });
  }

  async update(
    whereUniqueInput: Prisma.BirthdayWhereUniqueInput,
    updateData: Prisma.BirthdayUpdateInput,
  ) {
    return this.prisma.birthday.update({
      data: updateData,
      where: whereUniqueInput,
    });
  }

  async remove(id: number) {
    return this.prisma.birthday.update({
      data: { isDeleted: true },
      where: { id: +id },
    });
  }
}
