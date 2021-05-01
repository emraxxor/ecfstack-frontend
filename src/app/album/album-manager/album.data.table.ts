import { DataSourceRow } from '../../component/table/data.source.row';
import { StatusResponse } from '../../data/status.response';
import { HttpClient } from '@angular/common/http';
import { AlbumType } from './album.type';
import { DataTable } from '../../component/table/data.table';
import { PageEvent } from 'src/app/component/table/event/page.event';

export class AlbumDataTable extends DataTable<AlbumType> {

  displayedColumns = ['id', 'albumName', 'albumType', 'description'];

  displayedHeaders = {
     id: 'Identifier',
     albumName: 'Album name',
     albumType: 'Type',
     description: 'Description'
  };

  constructor(protected http: HttpClient) {
      super(http);
  }

  async pageChange(e: PageEvent): Promise<void> {
    try {
      const albums = await this.
                           http
                           .get<StatusResponse<Array<AlbumType>>>(`/api/album/ordered?page=${ e.page > 0 ? (e.page - 1) : e.page}`)
                           .toPromise();

      const data = new Array<DataSourceRow<AlbumType>>();
      albums.object.forEach( ex => data.push( {columns: ex}) );
      this.dataSource.update(data);
      this.dataSubject.next(this.dataSource);
    } catch (e) {
      console.error(e);
    }
  }

  async init(): Promise<void> {
    try {
        const total = await this.http.get<StatusResponse<any>>(`/api/album/total`).toPromise();
        const albums = await this.http.get<StatusResponse<Array<AlbumType>>>(`/api/album/ordered?page=0`).toPromise();
        const data = new Array<DataSourceRow<AlbumType>>();
        albums.object.forEach( e => data.push( {columns: e}) );
        this.dataSource.init( data, (total.object as number)  , 20 );
        this.dataSubject.next(this.dataSource);
    } catch (e) {
        console.error(e);
    }
  }
}
