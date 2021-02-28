import { SharedModule } from './shared/shared.module';
import { environment } from './../environments/environment.prod';
import { AlbumEffects } from './album/store/album-list.effects';
import { CoreModule } from './core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AlbumEffects ]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
