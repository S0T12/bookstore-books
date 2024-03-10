### Book Microservice

This project is a microservice application built with NestJS that provides message pattern endpoints for managing books. It utilizes MongoDB for data storage, Redis for caching, and RabbitMQ for message queuing.

## How to Run

### Local Development

1. Clone this repository to your local machine.
2. Install dependencies using npm:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start:dev
   ```

## Endpoints

### Book Management

- **createBook**: Create a new book.
- **findAllBooks**: Get all books.
- **findOneBook**: Get a book by ID.
- **updateBook**: Update a book by ID.
- **removeBook**: Delete a book by ID.
- **findByTitle**: Get books by title.
- **findByAuthor**: Get books by author.
- **findByGenre**: Get books by genre.
- **findByYearOfPublication**: Get books by year of publication.
- **searchBooks**: Search books by title, author, genre, or year of publication.
- **findPopularBooks**: Get popular books.

### Cache Management

- **setPopularBooks**: Cache popular books.
- **getPopularBooks**: Get popular books from cache.
- **clearPopularBooksCache**: Clear popular books cache.

## Algorithms and Functionality

### Searching Books

To search for books, use the `searchBooks` endpoint. This endpoint accepts a query string and searches for books by title, author, genre, or year of publication. The algorithm utilizes MongoDB's `$regex` operator for text search and exact matches for other fields.

### Caching Popular Books

The application caches popular books using Redis. When the `setPopularBooks` endpoint is called, it stores the provided list of books in the Redis cache with an expiration time. The `getPopularBooks` endpoint retrieves the cached popular books, and `clearPopularBooksCache` clears the cache.

### Incrementing View Count

The `findOneBook` endpoint increments the view count of the book retrieved from MongoDB. This functionality helps track the popularity of books based on user interactions.
