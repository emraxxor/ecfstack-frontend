import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn) {
      const authorizedRequest = request.clone({ headers: new HttpHeaders({ Authorization: `Bearer ${this.authService.token}` }) });
      return next.handle(authorizedRequest);
    } else {
      return next.handle(request);
    }
  }
}
