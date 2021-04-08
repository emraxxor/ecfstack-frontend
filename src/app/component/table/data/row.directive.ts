import { DataSource } from './../data.source';
import { ContentBasedDataTableComponent } from './../content.based.data.table';
import { Directive, ElementRef, OnInit, Input, ViewContainerRef, AfterContentInit, TemplateRef, OnChanges, SimpleChanges, OnDestroy} from "@angular/core";


/**
 * Directive for the data table
 *
 * @author Attila Barna
 */
@Directive({
  selector: '[appDataRow]'
})
export class DataRowDirective implements OnInit, AfterContentInit, OnChanges, OnDestroy  {

  context: any = {};
  headers: any = {};

  @Input() set appDataRow(context: any) {
    this.context.$implicit = this.context.appDataRow = context;
    this.updateView();
  }

  @Input() set appDataRowColumns(data: any) {
      this.headers = data;
      this.updateView();
  }


  constructor(
      private ef: ElementRef,
      private viewContainerRef: ViewContainerRef,
      private templateRef: TemplateRef<any>,
      private table: ContentBasedDataTableComponent<any>
    ) {
      this.viewContainerRef.clear();
      this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    }

  ngOnInit(): void {
    this.table.datatable.dataSubject.subscribe( (res: any) => {
      this.updateView();
    });
  }

  ngOnDestroy(): void {
    this.table.datatable.dataSubject.unsubscribe();
  }

  ngAfterContentInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
     this.updateView();
  }

  updateView(): void {
    this.viewContainerRef.clear();
    const rows: any = [];

    if ( !this.table.datatable.dataSource.data ) {
      return;
    }


    this.table.datatable.dataSource.data.forEach( (e: any) => {
        const row: any = {};

        Object.keys(this.headers).forEach( ( x: string) => {
             row[x] = e.columns[x];
        });

        rows.push(row);
    });

    rows.forEach( (row: any, index: number) =>  this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit:row, index  } ) );
  }

}
