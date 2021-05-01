import { StatusResponse } from '../../data/status.response';
import { Picture } from '../data/picture';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ImageService  {

  constructor(private http: HttpClient) { }

  create(data: Picture): Observable<StatusResponse<any>>  {
      return this.http.post<StatusResponse<any>>(`/api/album/${data.albumId}`, data);
  }

  images(albumId: number, page: number): Observable<StatusResponse<any>> {
    return this.http.get<StatusResponse<any>>(`/api/album/${albumId}/${page}`);
  }
}
