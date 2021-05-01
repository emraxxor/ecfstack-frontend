import { DataSourceRow } from './data.source.row';

/**
 * @author Attila Barna
 */
export class DataSource<T> {

    data!: Array<DataSourceRow<T>>;

    total!: number;

    pageSize !: number;

    constructor() {
    }

    update(data: Array<DataSourceRow<T>>): void {
      this.data = data;
    }

    init(data: Array<DataSourceRow<T>>, total: number, pageSize: number ): void {
      this.data = data;
      this.total = total;
      this.pageSize = pageSize;
    }

}
