import { AlbumManagerComponent } from './album-manager/album.manager.component';
import { AlbumListComponent } from './album-list/album.list.component';
import { AlbumFormComponent } from './form/album.form.component';
import { AuthGuard } from './../guard/auth.guard';
import { AlbumComponent } from './album.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AlbumComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: AlbumFormComponent },
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
