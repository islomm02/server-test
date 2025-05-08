import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'authorId', required: false, type: Number })
  @ApiQuery({ name: 'price', required: false, type: Number })
  @ApiQuery({ name: 'from', required: false, type: Number, example: 0 })
  @ApiQuery({ name: 'take', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['price', 'name', 'authorId'],
  })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('price') price?: string,
    @Query('authorId') authorId?: string,
    @Query('from') from?: string,
    @Query('take') take?: string,
    @Query('sort') sort?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    const options = {
      name,
      price: price ? Number(price) : undefined,
      authorId: authorId ? Number(authorId) : undefined,
      from: from ? Number(from) : 0,
      take: take ? Number(take) : 10,
      sort,
      order,
    };

    return this.bookService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
