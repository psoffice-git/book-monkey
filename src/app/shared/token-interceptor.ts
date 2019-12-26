/**
 * oauth http interceptor
 */
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authToken = '1234567890';

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
      const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authToken}`
          }
        }
      );
      return next.handle(newRequest);
  }
}


