import { DataRowDirective } from './../component/table/data/row.directive';
import { ContentBasedDataTableComponent } from './../component/table/content.based.data.table';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultDataTableComponent } from './../component/table/default.data.table';
import { DialogComponent } from './../component/ui/dialog.component';
import { PlaceholderDirective } from './../component/ui/placeholder.directive';
import { InputFileComponent } from './../component/ui/input.file.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../component/ui/image.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ImageComponent,
    InputFileComponent,
    PlaceholderDirective,
    DataRowDirective,
    DialogComponent,
    DefaultDataTableComponent,
    ContentBasedDataTableComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    CommonModule,
    NgxMasonryModule,
  ],
  exports: [
    NgbModule,
    HttpClientModule,
    ImageComponent,
    InputFileComponent,
    PlaceholderDirective,
    DataRowDirective,
    DialogComponent,
    CommonModule,
    DefaultDataTableComponent,
    ContentBasedDataTableComponent,
    NgxMasonryModule
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}
