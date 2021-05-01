import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {PhotoRoutingModule} from './photo-routing.module';
import {PhotoViewComponent} from './photo-view/photo.view.component';
import {PhotoComponent} from './photo.component';
import {PhotoListComponent} from './photo-list/photo.list.component';


/**
 * @author Attila Barna
 */
@NgModule({
  declarations: [
    PhotoComponent,
    PhotoViewComponent,
    PhotoListComponent,
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    PhotoRoutingModule,
    SharedModule,
  ],
  providers: []
})

export class PhotoModule {}
