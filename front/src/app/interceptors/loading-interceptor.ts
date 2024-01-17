import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs/operators';
import environment from "../../environments/environment";
import {AppService} from "../services/app.service";
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private readonly backendUrl = environment.apiUrl;
  constructor(private appService: AppService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone();
    if (request.url.indexOf(this.backendUrl) !== -1) {
      this.appService.loader.count++;
    }
    return next.handle(request).pipe(
      finalize(() => {
        if (request.url.indexOf(this.backendUrl) !== -1) {
          // just for the visual loading purpose. no need for timeout
          setTimeout(() => this.appService.loader.count--, 500);
        }
      })
    );
  }
}

// P.S. we can make more fuzzy logic like && request.url.indexOf('someRes') !== -1 or even check for special http header,
// check it and remove
