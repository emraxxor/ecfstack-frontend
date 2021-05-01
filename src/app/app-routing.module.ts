import { UserModule } from './user/user.module';
import { AlbumModule } from './album/album.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {PhotoModule} from './photo/photo.module';
import {ProfileModule} from './profile/profile.module';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => ProfileModule,
  },
  {
    path: 'album',
    loadChildren: () => AlbumModule
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  },
  {
    path: 'photo',
    loadChildren: () => PhotoModule
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
