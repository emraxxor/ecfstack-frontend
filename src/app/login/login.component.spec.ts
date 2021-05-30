import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {
  AuthenticationStorageService, AuthRequest
} from '../services/auth.service';
import {Injectable} from '@angular/core';
import {User} from '../data/user';

@Injectable()
export class MockAuthService extends AuthenticationStorageService {

  user(): User {
    return {
      userId: 1,
      userName: 'test',
      userPassword: '',
      userMail: 'mail',
      firstName: 'first',
      lastName: 'last',
      role: 'ADMIN',
      address: 'address',
      city: 'CITY',
      state: 'state',
      zip: 1234,
    };
  }

  token(): string {
    return '';
  }
}

@Injectable()
export class AuthService {

  private currentToken: any = null;

  private currentUser: any = null;

  get user(): User {
    if (!this.currentUser) {
      this.currentUser = this.authStorageService.user();
    }

    return this.currentUser;
  }
  constructor(
    private httpClient: HttpClient,
    private authStorageService: AuthenticationStorageService) {}

  login(req: AuthRequest): Promise<any> | any {
    return this.authStorageService.user();
  }

  logout(): void {
    this.currentUser = null;
    this.currentToken = null;
  }

}


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        AuthService,
        {
          provide: AuthenticationStorageService,
          useClass: MockAuthService
        },
      ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
