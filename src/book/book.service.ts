import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './schema/book.schema';
import { BookRepository } from './repositories/book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = {
      ...createBookDto,
      inStock: createBookDto.inStock || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
    };
    return this.bookRepository.create(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findOneById(id: string): Promise<Book | NotFoundException> {
    const book = await this.bookRepository.findOneById(id);
    if (!book) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | NotFoundException> {
    const book = await this.bookRepository.findOneById(id);
    if (!book) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    const updatedBook = Object.assign(book, updateBookDto);
    return this.bookRepository.update(id, updatedBook);
  }

  async delete(id: string): Promise<Book | NotFoundException> {
    const book = await this.bookRepository.findOneById(id);
    if (!book) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    const removedBook = await this.bookRepository.delete(id);
    return removedBook;
  }

  async findByTitle(title: string): Promise<Book[]> {
    return this.bookRepository.findByTitle(title);
  }

  async findByAuthor(author: string): Promise<Book[]> {
    return this.bookRepository.findByAuthor(author);
  }

  async findByGenre(genre: string): Promise<Book[]> {
    return this.bookRepository.findByGenre(genre);
  }

  async findByYearOfPublication(year: number): Promise<Book[]> {
    return this.bookRepository.findByYearOfPublication(year);
  }

  async searchBooks(query: string): Promise<Book[]> {
    const books = await Promise.all([
      this.bookRepository.findByTitle(query),
      this.bookRepository.findByAuthor(query),
      this.bookRepository.findByGenre(query),
      this.bookRepository.findByYearOfPublication(Number(query)),
    ]);
    return books
      .flat()
      .filter(
        (book, index, self) =>
          self.findIndex((b) => b._id === book._id) === index,
      );
  }

  async findPopularBooks(): Promise<Book[]> {
    return this.bookRepository.findTopViewedBooks(10);
  }

  async updateBookStock(
    bookId: string,
    quantity: number,
    action: 'add' | 'remove',
  ): Promise<Book> {
    return this.bookRepository.updateStock(bookId, quantity, action);
  }
}
