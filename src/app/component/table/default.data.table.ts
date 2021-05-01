import { ItemEvent } from './event/item.event';
import { DataTable } from './data.table';
import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Simple data table component based on bootstrap component
 *
 * @author Attilba Barna
 */
@Component({
  selector: 'app-data-table-component',
  templateUrl: './default.data.table.html',
})
export class DefaultDataTableComponent<T extends DataTable<any>> implements OnInit {

  @Input() datatable!: T;

  @Output() itemClick = new EventEmitter<ItemEvent>();

  page = 0;

  pageSize = 0;

  collectionSize = 0;

  constructor() {
  }

  clickOnItem(row: any, column: any, event: Event): void  {
      this.itemClick.emit({row, column, event});
  }

  pageChange(): void {
     this.datatable.pageChange({
       page: this.page,
       pageSize: this.pageSize,
       collectionSize: this.collectionSize
     });
  }

  ngOnInit(): void {
    this.datatable.dataSubject.subscribe( res => {
        this.pageSize = res.pageSize;
        this.collectionSize = res.total;
    });
  }
}
