import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


export class UserFormComponent  {

  settingsForm: FormGroup = this.fb.group({
    userName: ['', [Validators.required, this.validUserName.bind(this)]],
    userPassword: ['', Validators.required],
    userPasswordRE:  ['', [Validators.required, this.validPassword.bind(this)]],
    userMail: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  invalidUserName = false;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userService: UserService) { }

  validPassword(control: FormControl): { [s: string]: boolean} | null {
    if ( this.settingsForm?.get('userPassword')?.value !== control.value ) {
      return { invalid: true};
    }
    return null;
  }

  validUserName(control: FormControl): {[key: string]: any } | null  {
    if ( control.value !== '' ) {
      this.userService.exists(control.value).then( e => this.invalidUserName = e);
    }
    return null;
  }
}
