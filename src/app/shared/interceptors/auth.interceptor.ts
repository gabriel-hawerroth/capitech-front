import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next,
  _snackBar = inject(MatSnackBar)
) => {
  const requestUrl: Array<string> = req.url.split('/');
  const apiUrl: Array<string> = environment.baseApiUrl.split('/');

  if (requestUrl[2] === apiUrl[2]) {
    const token: string = 'yFqHuO28jU60EvDZG5x7b58SOvwdQy4w';

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          _snackBar.open('Token expirado', '', {
            duration: 4000,
          });
        }

        return throwError(() => err);
      })
    );
  } else {
    return next(req);
  }
};
