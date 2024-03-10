import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://localhost:27017/book'),
    CacheModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
