import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, map, catchError } from 'rxjs/operators';

import { throwError, Observable } from 'rxjs';
import { Book } from './book';
import { BookRaw } from './book-raw';
import { BookFactory } from './book-factory';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com/secure';
  //private api = 'https://api3.angular-buch.com';

  constructor(private http: HttpClient) {
    //this.getAll();
   }

   getAll(): Observable<Book[]> {
     return this.http.get<BookRaw[]>(`${this.api}/books`).pipe(
          map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b))));
   }

   getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books/search/${searchTerm}`).pipe(
         map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b)),
         catchError(this.errorHandler)
         ));
  }

   getSingle(isbn: string): Observable<Book> {
      return this.http.get<BookRaw>(`${this.api}/book/${isbn}`).pipe(
        retry(3),
        map(b => BookFactory.fromRaw(b), catchError(this.errorHandler)));
   }

   create(book: Book): Observable<any> {
    return this.http.post(
      `${this.api}/book`,
      book,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

   remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
 }

 private errorHandler(error: HttpErrorResponse): Observable<any> {
   console.error('Fehler aufgetreten');
   return throwError(error);
 }
}
