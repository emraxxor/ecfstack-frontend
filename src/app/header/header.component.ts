import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
export class HeaderComponent implements OnInit  {

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  get loggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(e: Event): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
