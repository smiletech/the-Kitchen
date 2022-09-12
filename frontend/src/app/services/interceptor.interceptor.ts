import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {  Observable } from 'rxjs';


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  token: any;

  constructor( ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = JSON.parse(localStorage.getItem("token")!)
    console.log(this.token);

    if (this.token) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization',`Bearer ${this.token}`) });
      return next.handle(tokenizedReq)
      }
      return next.handle(req);
    }
  }

