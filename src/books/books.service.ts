import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity'

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.nextId++,
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      publishYear: createBookDto.publishYear,
      reserved: false, 
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto): Book {
    const book = this.findOne(id); 

    if (updateBookDto.title !== undefined) book.title = updateBookDto.title;
    if (updateBookDto.author !== undefined) book.author = updateBookDto.author;
    if (updateBookDto.isbn !== undefined) book.isbn = updateBookDto.isbn;
    if (updateBookDto.publishYear !== undefined) book.publishYear = updateBookDto.publishYear;
    if (updateBookDto.reserved !== undefined) book.reserved = updateBookDto.reserved;
    
    return book;
  }

  remove(id: number): void {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    this.books.splice(index, 1);
  }
}
