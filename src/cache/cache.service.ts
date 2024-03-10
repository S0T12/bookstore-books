import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';
import { Book } from '../book/schema/book.schema';

@Injectable()
export class CacheService {
  private readonly redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis.Redis({ host: 'localhost', port: 6379 });
  }

  async setPopularBooks(books: Book[], expirationTimeSeconds: number) {
    await this.redisClient.setex(
      'popular_books',
      expirationTimeSeconds,
      JSON.stringify(books),
    );
  }

  async getPopularBooks(): Promise<Book[]> {
    const cachedBooks = await this.redisClient.get('popular_books');
    if (cachedBooks) {
      return JSON.parse(cachedBooks);
    }
    return null;
  }

  async clearPopularBooksCache() {
    await this.redisClient.del('popular_books');
  }
}
