import { AlbumManagerComponent } from './album-manager/album.manager.component';
import { AlbumListComponent } from './album-list/album.list.component';
import { AuthGuard } from '../guard/auth.guard';
import { AlbumComponent } from './album.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateAlbumComponent} from './album-create/create.album.component';


const routes: Routes = [
  {
    path: '',
    component: AlbumComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: CreateAlbumComponent },
      { path: 'list', component: AlbumManagerComponent },
      {
        path: ':id',
        component: AlbumListComponent
      },
    ]
  }
];

/**
 * @author Attila Barna
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule {}
