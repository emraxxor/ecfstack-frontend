import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhotoComponent} from './photo.component';
import {PhotoViewComponent} from './photo-view/photo.view.component';
import {PhotoListComponent} from './photo-list/photo.list.component';


const routes: Routes = [
  {
    path: '',
    component: PhotoComponent,
    canActivate: [],
    children: [
      {
        path: 'list',
        component: PhotoListComponent
      },
      {
        path: ':id',
        component: PhotoViewComponent
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
export class PhotoRoutingModule {}
