import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';

import { Book } from '../shared/book';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bsService: BookStoreService, private router: Router, private route: ActivatedRoute ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.bsService.getSingle(params.get('isbn')).subscribe(b => this.book = b);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm('Buch wirklich löschen?')) {
      this.bsService.remove(this.book.isbn).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}));
    }
  }
}
