import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  styles : [
    `
      .logout {
        cursor: pointer;
      }
    `
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) {

  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(e: Event): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
