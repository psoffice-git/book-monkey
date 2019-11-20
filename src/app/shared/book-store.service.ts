import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api3.angular-buch.com';

  constructor(private http: HttpClient) {
    //this.getAll();
   }

   getAll(): Observable<Book[]> {
     return this.http.get<any[]>(`${this.api}/books`);
   }

   getSingle(isbn: string): Observable<Book> {
      return this.http.get<any>(`${this.api}/book/${isbn}`);
   }

   remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
 }
}
