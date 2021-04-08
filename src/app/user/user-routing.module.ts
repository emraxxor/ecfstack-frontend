import { AdminGuard } from './../guard/admin.guard';
import { UserManagerComponent } from './list/user.manager.component';
import { UserComponent } from './user.component';
import { AuthGuard } from './../guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'list', component: UserManagerComponent },
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
export class UserRoutingModule {}
