import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError as observableThrowError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getData(source: string) {
    return this.http.get(source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }
  // .post<any>(environment.base_api + `admin/login`, data)
  postdata(source: any,url:string) {
    return this.http.post<any>(environment.base_api+url,source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }

  putData(source: any,url:string) {
    return this.http.put<any>(environment.base_api+url,source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }

  DeleteData(source: any,url:string) {
    return this.http.delete<any>(environment.base_api+url+'?'+source).pipe(
      tap((res: any) => res),
      catchError(this.handleError)
    );
  }






  private handleError(error: any) {
    return observableThrowError(error.error || 'Server error');
  }
}
