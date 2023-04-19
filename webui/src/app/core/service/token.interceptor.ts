import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (localStorage.getItem('token')) {
      let authReq;
        authReq = req.clone({headers: req.headers.set('Authorization', `${localStorage.getItem('token')}`)});
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
