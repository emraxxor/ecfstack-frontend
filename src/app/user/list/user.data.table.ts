import { User } from '../../data/user';
import { DataSourceRow } from '../../component/table/data.source.row';
import { StatusResponse } from '../../data/status.response';
import { HttpClient } from '@angular/common/http';
import { DataTable } from '../../component/table/data.table';
import { PageEvent } from 'src/app/component/table/event/page.event';

export class UserDataTable extends DataTable<User> {

  displayedColumns = ['userId', 'userName', 'userMail', 'firstName', 'lastName'];

  displayedHeaders = {
     userId: 'Identifier',
     userName: 'User name',
     userMail: 'Mail',
     firstName: 'First name',
     lastName: 'Last name'
  };

  constructor(protected http: HttpClient) {
      super(http);
  }

  async pageChange(e: PageEvent): Promise<void> {
    try {
      const albums = await this.
                            http
                            .get<StatusResponse<Array<User>>>(`/api/admin/user/ordered?page=${ e.page > 0 ? (e.page - 1) : e.page}`)
                            .toPromise();
      const data = new Array<DataSourceRow<User>>();
      albums.object.forEach( album => data.push( {columns: album}) );
      this.dataSource.update(data);
      this.dataSubject.next(this.dataSource);
    } catch (e) {
      console.error(e);
    }
  }

  async init(): Promise<void> {
    try {
     const total = await this.http.get<StatusResponse<number>>(`/api/admin/user/total`).toPromise();
     const albums = await this.http.get<StatusResponse<Array<User>>>(`/api/admin/user/ordered?page=0`).toPromise();
     const data = new Array<DataSourceRow<User>>();
     albums.object.forEach( e => data.push( {columns: e}) );
     this.dataSource.init( data, total.object  , 20 );
     this.dataSubject.next(this.dataSource);
    } catch (e) {
      console.error(e);
    }
  }
}
