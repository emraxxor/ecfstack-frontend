import {FileData} from '../type/file.data';
import {StatusResponse} from '../data/status.response';
import {HttpClient} from '@angular/common/http';
import {User, UserPasswordElement} from '../data/user';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';

/**
 * @author Attila Barna
 */
@Injectable({providedIn: 'root'})
export class UserService  {

  constructor(private http: HttpClient) { }

  async exists(name: string): Promise<boolean> {
    return await this
      .http
      .head(`/users/${name}`, {observe: 'response'})
      .pipe(
        map(e => e.status === 200),
        catchError(error => of(false))
      )
      .toPromise();
  }

  info(): Observable<User> {
      return this.http.get<User>(`/api/user/info`);
  }

  image(): Observable<StatusResponse<FileData>>  {
      return this.http.get<StatusResponse<FileData>>(`/api/user/image`);
  }

  updateImage(  data: FileData ): Observable<StatusResponse<any>> {
      return this.http.put<StatusResponse<any>>(`/api/user/image`, data);
  }

  create(data: User): Observable<StatusResponse<any>> {
      return this.http.post<StatusResponse<any>>(`/users`, data);
  }

  update(user: User): Observable<StatusResponse<User>> {
    return this.http.put<StatusResponse<User>>(`/api/user`, user);
  }

  updatePassword(e: UserPasswordElement): Observable<StatusResponse<User>> {
    return this.http.put<StatusResponse<User>>(`/api/user/password`, e);
  }

}
