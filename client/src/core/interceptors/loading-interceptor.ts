import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { delay } from 'rxjs/internal/operators/delay';
import { finalize } from 'rxjs/internal/operators/finalize';
import { of, tap } from 'rxjs';

const cache = new Map<string, any>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  if (req.method === 'GET') {
    const cachedResponse = cache.get(req.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }

  busyService.busy();

  return next(req).pipe(
    delay(500),
    tap((response) => {
      cache.set(req.urlWithParams, response);
    }),
    finalize(() => {
      busyService.idle();
    }),
  );
};
