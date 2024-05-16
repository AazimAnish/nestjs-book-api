import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './app.service';
import { Book } from './FakeDatabase';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get('getById/:id')
  getBookById(@Param('id') id: string): Book | undefined {
    const bookID = +id
    return this.booksService.findById(bookID);
  }

  @Post() 
  addBook(@Body() book: Partial<Book>): Book {
    const bookData = book;

    if (!bookData.author || !bookData.title || !bookData.publicationYear) return undefined;

    return this.booksService.create(bookData);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() book: Partial<Book>
  ): Book | undefined {
    return this.booksService.update(+id, book);
  }
}
