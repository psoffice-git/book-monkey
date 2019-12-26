/**
 * log http requests: success and error via HttpInterceptor
 */
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HttpLoginterceptor implements HttpInterceptor {
  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    console.log('request: ', request);

    return next.handle(request).pipe(
      tap(
        event => console.log('response success: ', event),
        error => console.log('response error: ', error)
      )
    );
  }
}

