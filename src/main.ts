import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, HttpErrorResponse, HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthServiceService } from './services/auth-service.service';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app/app.routes';
import { tap } from 'rxjs';

// function interceptor(request: HttpRequest<unknown>, response: HttpHandlerFn) {

//   return response(request).pipe(tap({
//     next: (event: any) => {
//       if (event instanceof HttpErrorResponse) {
//         if (event.status === 401) {
//           console.log('error');
//         }
//       }
//     }
//   }));
// }

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    AuthServiceService,
    provideRouter(routes, withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always'
      })),
    // provideHttpClient(withInterceptors([interceptor]))
  ]
}).catch((err) => console.error(err));
