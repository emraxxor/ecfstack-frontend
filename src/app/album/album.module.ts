import { AlbumImageComponent } from './album-picture/album.picture.component';
import { ImageService } from './services/image.service';
import { AlbumListComponent } from './album-list/album.list.component';
import { AlbumService } from './../services/album.service';
import { AlbumRoutingModule } from './album-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AlbumFormComponent } from './form/album.form.component';
import { AlbumComponent } from './album.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMasonryModule } from 'ngx-masonry';


/**
 * @author Attila Barna
 */
@NgModule({
  declarations: [
    AlbumComponent,
    AlbumFormComponent,
    AlbumListComponent,
    AlbumImageComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AlbumRoutingModule,
    SharedModule,
    NgxMasonryModule
  ],
  providers: [AlbumService, ImageService]
})

export class AlbumModule {}
