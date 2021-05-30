import { DefaultConfiguration } from '../config';
import { User, UserRole } from '../data/user';
import { HttpClient } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Inject, Injectable } from '@angular/core';
import { Request } from 'express';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse extends User {
  token: string;
}


@Injectable()
export abstract class AuthenticationStorageService {
  abstract user(): User;
  abstract token(): string;
}

@Injectable()
export class BrowserAuthStorageService extends AuthenticationStorageService {

  user(): User {
    return JSON.parse(sessionStorage.getItem(DefaultConfiguration.USER_STORAGE_KEY) as string);
  }

  token(): string {
    return sessionStorage.getItem(DefaultConfiguration.TOKEN_STORAGE_KEY) as string;
  }
}

@Injectable()
export class ServerAuthStorageService extends AuthenticationStorageService {

  constructor(@Inject(REQUEST) private request: Request) {
    super();
  }

  user(): User {
    return JSON.parse(this.request.cookies[DefaultConfiguration.USER_STORAGE_KEY]);
  }


  token(): string {
    return this.request.cookies?.[DefaultConfiguration.TOKEN_STORAGE_KEY] ?? null;
  }
}

/**
 * @author Attila Barna
 */
@Injectable({providedIn: 'root'})
export class AuthService {

  private currentToken: any = null;

  private currentUser: any = null;

  get user(): User {
    if (!this.currentUser) {
      this.currentUser = this.authStorageService.user();
    }

    return this.currentUser;
  }


  get token(): string {
    if (!this.currentToken && this.authStorageService.token ) {
      this.currentToken = this.authStorageService.token();
    }

    return this.currentToken;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return this.user.role === UserRole.Admin;
  }

  constructor(private httpClient: HttpClient, private authStorageService: AuthenticationStorageService) {}

  async login(req: AuthRequest): Promise<any> {
      const data = await this.httpClient.post<AuthResponse>('/authenticate', req).toPromise();
      if ( data ) {
        await this.setUser(data);
      }
      return data;
  }

  logout(): void {
    sessionStorage.removeItem(DefaultConfiguration.TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(DefaultConfiguration.USER_STORAGE_KEY);
    document.cookie = `${DefaultConfiguration.TOKEN_STORAGE_KEY}=`;
    document.cookie = `${DefaultConfiguration.USER_STORAGE_KEY}=${JSON.stringify({})}`;
    this.currentUser = null as any;
    this.currentToken = null as any;
  }

  private async setUser(user: AuthResponse): Promise<void> {
      this.currentToken = user?.token;
      const userInfo = await this.httpClient.get<AuthResponse>('/api/user/info', {}).toPromise();
      user = {...user, ...userInfo};
      sessionStorage.setItem(DefaultConfiguration.TOKEN_STORAGE_KEY, user.token);
      sessionStorage.setItem(DefaultConfiguration.USER_STORAGE_KEY, JSON.stringify(user));
      document.cookie = `${DefaultConfiguration.TOKEN_STORAGE_KEY}=${user.token}`;
      document.cookie = `${DefaultConfiguration.USER_STORAGE_KEY}=${JSON.stringify(user)}`;
      this.currentUser = user;
  }
}
