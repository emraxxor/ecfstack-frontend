import { DataRowDirective } from '../component/table/data/row.directive';
import { ContentBasedDataTableComponent } from '../component/table/content.based.data.table';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultDataTableComponent } from '../component/table/default.data.table';
import { DialogComponent } from '../component/ui/dialog.component';
import { PlaceholderDirective } from '../component/ui/placeholder.directive';
import { InputFileComponent } from '../component/ui/input.file.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../component/ui/image.component';
import { HttpClientModule } from '@angular/common/http';
import {InputBackgroundDirective} from '../input/input.background';
import {LoadingComponent} from './ui/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AlbumImageComponent} from '../album/album-picture/album.picture.component';
import {PhotoDialogWindowComponent} from '../photo/photo-list/photo.dialog.window.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AlertDialogComponent} from "./ui/dialog/alert.dialog.component";

@NgModule({
  declarations: [
    ImageComponent,
    InputFileComponent,
    PlaceholderDirective,
    DataRowDirective,
    DialogComponent,
    DefaultDataTableComponent,
    ContentBasedDataTableComponent,
    InputBackgroundDirective,
    LoadingComponent,
    AlbumImageComponent,
    PhotoDialogWindowComponent,
    AlertDialogComponent,
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    CommonModule,
    NgxMasonryModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule
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
    NgxMasonryModule,
    LoadingComponent,
    AlbumImageComponent,
    PhotoDialogWindowComponent,
    AlertDialogComponent
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule {}
