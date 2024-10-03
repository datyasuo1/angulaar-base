import { ApiHandlerService } from 'src/app/service/app/api-handler.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private apiHandlerService: ApiHandlerService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const { url } = request;

        const headersConfig: { [name: string]: string } = {
            'Accept-Language': 'vi',
        };

        if (!url.includes(environment.appChatURL)) {
            headersConfig['Tenant'] = environment.tenant;
        }

        const modifiedRequest = request.clone({ setHeaders: headersConfig });

        return next.handle(modifiedRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                this.apiHandlerService.handleError(error);
                return throwError(() => error);
            }),
        );
    }
}
