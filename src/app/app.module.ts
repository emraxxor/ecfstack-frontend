import { DialogComponent } from './component/ui/dialog.component';
import { PlaceholderDirective } from './component/ui/placeholder.directive';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './core/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { AuthenticationStorageService, BrowserAuthStorageService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,
    DialogComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
      provide: AuthenticationStorageService,
      useClass: BrowserAuthStorageService
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
