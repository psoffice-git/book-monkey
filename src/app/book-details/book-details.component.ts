import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bsService: BookStoreService, private route: ActivatedRoute ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.book = this.bsService.getSingle(params.get('isbn'));
  }

  getRating(num: number) {
    return new Array(num);
  }
}
