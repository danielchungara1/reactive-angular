import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LoadingService} from "./loading/loading.service";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.turnOn();

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.turnOff();
      })
    );
  }
}
