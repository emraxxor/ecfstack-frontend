import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataSource } from './data.source';
import { PageEvent } from './event/page.event';

/**
 * @author Attila Barna
 */
export abstract class DataTable<T>  {

  dataSource = new DataSource<T>();

  displayedColumns!: string[];
  displayedHeaders!: any;

  dataSubject = new Subject<DataSource<T>>();

  constructor(protected http: HttpClient) {
      this.init();
  }

  /**
   * The data table is initialized here.
   * The following properties must be set properly :
   *   - total
   *   - pageSize
   *   - displayedColumns
   */
  abstract init(): Promise<void>;

  /**
   * Invoked when the page is going to be changed
   */
  abstract pageChange(e: PageEvent): Promise<void>;


}
