import { DataTable } from './data.table';
import { OnInit, Component, Input,  AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

/**
 * Simple data table component based on bootstrap component
 *
 * @author Attila Barna
 */

@Component({
  selector: 'app-table-component',
  template: `<ng-content slot="table"></ng-content>`
})
export class ContentBasedDataTableComponent<T extends DataTable<any>> implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() datatable!: T;

  page = 0;

  pageSize = 0;

  collectionSize = 0;

  constructor() {
  }

  pageChange(): void {
     this.datatable.pageChange({
       page: this.page,
       pageSize: this.pageSize,
       collectionSize: this.collectionSize
     });
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
      this.datatable.dataSubject.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.datatable.dataSubject.subscribe( res => {
        this.pageSize = res.pageSize;
        this.collectionSize = res.total;
    });


  }
}
