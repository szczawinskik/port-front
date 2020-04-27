import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrHttpInterceptor implements HttpInterceptor {
    constructor(private service: ToastrService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap(evt => {
                    if (evt instanceof HttpResponse) {
                        if (evt.status === 200) {
                            this.service.success('Akcja wykonana poprawnie');
                        }
                    }
                }),
                catchError((err, caught) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 400) {
                            if (err.error) {
                                const error = err.error.join(', ');
                                this.service.warning(error, 'Błąd danych');
                            }
                        } else {
                            this.service.error('Wystąpił nieznany błąd');
                        }
                    }
                    throw new HttpErrorResponse({ });
                }));
    }
}
