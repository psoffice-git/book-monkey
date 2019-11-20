import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  keyUp$ = new Subject<string>();
  foundBooks: Book[] = [];
  isLoading = false;

  constructor(private bsService: BookStoreService) { }

  ngOnInit() {
    this.keyUp$.subscribe(e => console.log(e));
    this.keyUp$.pipe(filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bsService.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false ),
      ).subscribe(books => this.foundBooks = books);
  }

}
