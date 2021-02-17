import { StatusResponse } from './../data/status.response';
import { HttpClient } from '@angular/common/http';
import { User } from './../data/user';
import { Observable, of } from 'rxjs';
import {  Injectable, OnInit } from "@angular/core";
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService  {

  constructor(private http: HttpClient) { }

  async exists(name: string): Promise<boolean> {
    const res = await this
                .http
                .head(`/users/${name}`)
                .pipe(
                  catchError( error => {
                    if ( !(error.error instanceof ErrorEvent)) {
                     if (error.status === 404) {
                        return of(true);
                      }
                    }
                    return of(false);
                  }))
                  .toPromise();

    return res === null ? true : false;
  }

  create(data: User): Observable<StatusResponse> {
      return this.http.post<StatusResponse>(`/users`, data);
  }

}
