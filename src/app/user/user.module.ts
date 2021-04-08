import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserManagerComponent } from './list/user.manager.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


/**
 * @author Attila Barna
 */
@NgModule({
  declarations: [
    UserComponent,
    UserManagerComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
  ],
  providers: []
})

export class UserModule {}
