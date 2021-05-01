import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


/**
 * @author Attila Barna
 */
@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    ProfileRoutingModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: []
})

export class ProfileModule {}
