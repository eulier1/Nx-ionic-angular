import { Injectable } from '@angular/core';

import { ErrordialogService } from './errordialog.service';
import { AuthenticationService } from '@suite/services';

import { Router, ActivatedRoute, Route } from '@angular/router';

import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private errorDialogService: ErrordialogService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let data = {};

        data = {
          reason: ` ${error.message} `,
          status: `${error.status}`
        };

        if (error.status === 401 || error.status === 403) {
          data = {
            reason: ` Usuario no estas autorizado a ver dicho recurso `,
            status: `${error.status}`
          };

          if (this.authenticationService.isAuthenticated()) {
            this.errorDialogService.openDialog(data);
            this.router.navigate(['home']);
          } else {
            this.errorDialogService.openDialog(data);
            this.router.navigate(['login']);
          }
        }
        return throwError(error);
      })
    );
  }
}
