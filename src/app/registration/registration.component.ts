import { StatusResponse } from './../data/status.response';
import { catchError } from 'rxjs/operators';
import { UserService } from './../services/user.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './../data/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, NgForm, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  mForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required,this.validUserName.bind(this)]],
    userPassword: ['', Validators.required],
    userPasswordRE:  ['', [Validators.required, this.validPassword.bind(this)]],
    userMail: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  invalidUserName = false;
  userIsCreatedSuccessfully = false;
  dataIsSent = false;

  constructor(
         private router: Router,
         private fb: FormBuilder,
         private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  validPassword(control: FormControl): { [s: string]: boolean} | null {
    if ( this.mForm?.get('userPassword')?.value !== control.value ) {
      return { invalid: true};
    }
    return null;
  }

  validUserName(control: FormControl): {[key: string]: any } | null  {
    this.userService.exists(control.value).then( e => this.invalidUserName = e);
    return null;
  }

  onSubmit() {
      const data = this.mForm.getRawValue();
      console.log();
      if ( this.mForm.valid  ) {
          this.userService.create(data as User)
          .subscribe(
               (res: StatusResponse) => ( this.dataIsSent = true, this.userIsCreatedSuccessfully = res.code === 1 )  ,
               err => ( this.dataIsSent = true, this.userIsCreatedSuccessfully = false )
           );
      }
      console.log( data);
  }

}
