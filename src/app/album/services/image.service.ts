import { StatusResponse } from './../../data/status.response';
import { Picture } from '../data/picture';
import { FileData } from '../../type/file.data';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { Injectable, OnInit } from "@angular/core";
import { catchError, map } from 'rxjs/operators';

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
