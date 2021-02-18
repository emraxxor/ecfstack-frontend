import { StatusResponse } from './../data/status.response';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './../data/user';
import { Observable, of } from 'rxjs';
import { Injectable, OnInit } from "@angular/core";
import { catchError, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService  {

  constructor(private http: HttpClient) { }

  async exists(name: string): Promise<boolean> {
    const res = await this
                .http
                .head(`/users/${name}`, {observe: 'response'})
                .pipe(
                  map( e => e.status === 200),
                  catchError(error => of(false))
                )
                .toPromise();

    return res;
  }

  info(): Observable<User> {
      return this.http.get<User>(`/api/user/info`);
  }

  create(data: User): Observable<StatusResponse<any>> {
      return this.http.post<StatusResponse<any>>(`/users`, data);
  }

  update(user: User): Observable<StatusResponse<User>> {
    return this.http.put<StatusResponse<User>>(`/api/user`, user);
  }

}
