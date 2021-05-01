import { StatusResponse } from '../../data/status.response';
import {PhotoElement} from '../data/photo.element';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';
import {ScrollResponse} from '../../data/scroll.response';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PhotoService  {

  constructor(private http: HttpClient) { }

  images(token: string | undefined | null): Observable<ScrollResponse<PhotoElement>> {
    let url = `/api/photo`;

    if ( token && token !== '' ) {
      url += `?token=${token}`;
    }

    return this.http.get<ScrollResponse<PhotoElement>>(url);
  }
}
