import { UserService } from './services/user.service';
import { AuthInterceptor } from './core/auth.interceptor';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationStorageService, BrowserAuthStorageService } from './services/auth.service';

@NgModule({
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
  ]
})
export class CoreModule {}
