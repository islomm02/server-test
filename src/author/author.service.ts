import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAuthorDto) {
    let crted = await this.prisma.author.create({ data });
    return crted;
  }

  async findAll(options: {
    name?: string;
    from?: number;
    to?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    const where: any = {};
    if (options.name) where.name = options.name;

    const orderBy = options.sort
      ? { [options.sort]: options.order || 'asc' }
      : undefined;

    const datas = await this.prisma.author.findMany({
      where,
      skip: options.from ?? 0,
      take: options.to ?? 10,
      orderBy,
    });

    return datas;
  }

  async findOne(id: number) {
    let one = await this.prisma.author.findFirst({ where: { id } });
    return one;
  }

  async update(id: number, data: UpdateAuthorDto) {
    let updated = await this.prisma.author.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let deleted = await this.prisma.author.delete({ where: { id } });
    return deleted;
  }
}
