import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type BookDocument = Document & Book;

@Schema()
export class Book {
  @Prop({ required: false, type: SchemaTypes.ObjectId, auto: true })
  _id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  yearOfPublication: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: 0 })
  inStock: number;

  @Prop({ required: false, default: 0 })
  viewCount: number;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt: Date;

  @Prop({ required: false, default: null })
  deletedAt?: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
