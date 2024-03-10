import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern({ cmd: 'createBook' })
  async create(@Payload() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @MessagePattern({ cmd: 'findAllBooks' })
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @MessagePattern({ cmd: 'findOneBook' })
  async findOne(@Payload() id: string): Promise<Book | NotFoundException> {
    return this.bookService.findOneById(id);
  }

  @MessagePattern({ cmd: 'updateBook' })
  async update(
    @Payload() updateBookDto: UpdateBookDto,
  ): Promise<Book | NotFoundException> {
    return this.bookService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern({ cmd: 'removeBook' })
  async remove(@Payload() id: string): Promise<Book | NotFoundException> {
    return this.bookService.delete(id);
  }

  @MessagePattern({ cmd: 'findByTitle' })
  async findByTitle(@Payload() title: string): Promise<Book[]> {
    return this.bookService.findByTitle(title);
  }

  @MessagePattern({ cmd: 'findByAuthor' })
  async findByAuthor(@Payload() author: string): Promise<Book[]> {
    return this.bookService.findByAuthor(author);
  }

  @MessagePattern({ cmd: 'findByGenre' })
  async findByGenre(@Payload() genre: string): Promise<Book[]> {
    return this.bookService.findByGenre(genre);
  }

  @MessagePattern({ cmd: 'findByYearOfPublication' })
  async findByYearOfPublication(@Payload() year: number): Promise<Book[]> {
    return this.bookService.findByYearOfPublication(year);
  }

  @MessagePattern({ cmd: 'searchBooks' })
  async searchBooks(@Payload() query: string): Promise<Book[]> {
    return this.bookService.searchBooks(query);
  }

  @MessagePattern({ cmd: 'findPopularBooks' })
  async findPopularBooks(): Promise<Book[]> {
    return this.bookService.findPopularBooks();
  }

  @MessagePattern({ cmd: 'updateBookStock' })
  async updateBookStock(
    @Payload()
    payload: {
      bookId: string;
      quantity: number;
      action: 'add' | 'remove';
    },
  ): Promise<Book | NotFoundException> {
    const { bookId, quantity, action } = payload;
    return this.bookService.updateBookStock(bookId, quantity, action);
  }
}
