import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  invalidCreds = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    if ( this.authService.isLoggedIn ) {
      this.router.navigate(['/profile']);
    }
  }

  get username(): AbstractControl {
    return this.form.get('username') as AbstractControl;
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl;
  }


  async login(): Promise<void> {
    if (this.form.valid) {
      const res = this.authService.login(this.form.value);
      res.then(r => {
        this.router.navigate(['/profile']);
      });

      res.catch(err => {
        this.invalidCreds = true;
      });

    }
  }

}
