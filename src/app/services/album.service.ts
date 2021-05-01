import { HttpClient } from '@angular/common/http';
import { StatusResponse } from '../data/status.response';
import { Observable } from 'rxjs';
import { Album } from '../album/data/album';
import { Injectable } from '@angular/core';


/**
 * @author Attila Barna
 */
@Injectable({providedIn: 'root'})
export class AlbumService  {

  constructor(private http: HttpClient) { }

  create(data: Album): Observable<StatusResponse<any>> {
    return this.http.post<StatusResponse<any>>(`/api/album`, data);
}
}
