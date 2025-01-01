import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { catchError, switchMap, tap, throwError } from 'rxjs';

function globalHttpInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthServiceService);

  // Clone the request and attach the access token
  const accessToken = localStorage.getItem('Token');
  let modifiedRequest = request;

  if (accessToken) {
    modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Token expired. Attempting to refresh...');
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            switchMap((response: any) => {
              // Save the new tokens
              localStorage.setItem('Token', response.token);
              localStorage.setItem('refreshToken', response.refreshToken);

              // Retry the failed request with the new token
              const retryRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.token}`,
                },
              });

              return next(retryRequest);
            }),
            catchError((refreshError) => {
              console.error('Refresh token failed. Logging out...', refreshError);
              authService.logoutFn();
              return throwError(() => refreshError);
            })
          );
        } else {
          console.log('No refresh token available. Logging out...');
          authService.logoutFn();
        }
      }

      return throwError(() => error);
    })
  );
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    AuthServiceService,
    provideRouter(routes, withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always'
      })),
    provideHttpClient(withInterceptors([globalHttpInterceptor]))
  ]
}).catch((err) => console.error(err));
