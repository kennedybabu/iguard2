import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user!:any

  constructor(private authService:AuthService) {
    this.authService.userData$.subscribe((res)=> {
      this.user = res
    })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   

    if(!this.user) {
      return next.handle(request)
    }

    const authRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': JSON.parse(this.user).token
      })
    })
    return next.handle(authRequest);
  }
}
