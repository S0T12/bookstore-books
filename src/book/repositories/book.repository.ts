import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schema/book.schema';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(book: Book): Promise<Book> {
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOneById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (book) {
      await this.bookModel.updateOne({ _id: id }, { $inc: { viewCount: 1 } });
    }
    return book;
  }

  async findTopViewedBooks(limit: number): Promise<Book[]> {
    return this.bookModel.find().sort({ viewCount: -1 }).limit(limit).exec();
  }

  async update(id: string, book: Book): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, book, { new: true }).exec();
  }

  async delete(id: string): Promise<Book> {
    return this.bookModel.findOneAndDelete({ _id: id }).exec();
  }

  async findByTitle(title: string): Promise<Book[]> {
    const books = await this.bookModel.find({ title }).exec();
    if (books.length > 0) {
      await this.bookModel.updateMany({ title }, { $inc: { viewCount: 1 } });
    }
    return books;
  }

  async findByAuthor(author: string): Promise<Book[]> {
    const books = await this.bookModel.find({ author }).exec();
    if (books.length > 0) {
      await this.bookModel.updateMany({ author }, { $inc: { viewCount: 1 } });
    }
    return books;
  }

  async findByGenre(genre: string): Promise<Book[]> {
    const books = await this.bookModel.find({ genre }).exec();
    if (books.length > 0) {
      await this.bookModel.updateMany({ genre }, { $inc: { viewCount: 1 } });
    }
    return books;
  }

  async findByYearOfPublication(year: number): Promise<Book[]> {
    const books = await this.bookModel.find({ yearOfPublication: year }).exec();
    if (books.length > 0) {
      await this.bookModel.updateMany(
        { yearOfPublication: year },
        { $inc: { viewCount: 1 } },
      );
    }
    return books;
  }

  async updateStock(
    bookId: string,
    quantity: number,
    action: 'add' | 'remove',
  ): Promise<Book> {
    const update =
      action === 'add'
        ? { $inc: { inStock: quantity } }
        : { $inc: { inStock: -quantity } };
    const result = await this.bookModel
      .findByIdAndUpdate(bookId, update, { new: true })
      .exec();
    return result;
  }
}
