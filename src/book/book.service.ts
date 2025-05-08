import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBookDto) {
    let crted = await this.prisma.book.create({ data });
    return crted;
  }

  async findAll(options: {
    name?: string;
    price?: number;
    authorId?: number;
    from?: number;
    take?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    const where: any = {};
    if (options.name) where.name = options.name;
    if (typeof options.price === 'number') where.price = options.price;
    if (typeof options.authorId === 'number') where.authorId = options.authorId;

    const orderBy = options.sort
      ? { [options.sort]: options.order || 'asc' }
      : undefined;

    const datas = await this.prisma.book.findMany({
      where,
      skip: options.from,
      take: options.take,
      orderBy,
    });

    return datas;
  }

  async findOne(id: number) {
    let one = await this.prisma.book.findFirst({ where: { id } });
    return one;
  }

  async update(id: number, data: UpdateBookDto) {
    let updated = await this.prisma.book.update({ where: { id }, data });
    return updated;
  }

  async remove(id: number) {
    let deleted = await this.prisma.book.delete({ where: { id } });
    return deleted;
  }
}
