import { UserFormComponent } from '../form/user.form.component';
import { StatusResponse } from '../data/status.response';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../data/user';
import { Component, OnInit} from '@angular/core';
import { FormBuilder} from '@angular/forms';

/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends UserFormComponent implements OnInit {

  userIsCreatedSuccessfully = false;
  dataIsSent = false;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userService: UserService
  ) {
    super(router, route, fb, userService);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      const data = this.settingsForm.getRawValue();
      if ( this.settingsForm.valid  ) {
          this.userService.create(data as User)
          .subscribe(
               (res: StatusResponse<any>) => ( this.dataIsSent = true, this.userIsCreatedSuccessfully = res.code === 1 )  ,
               () => ( this.dataIsSent = true, this.userIsCreatedSuccessfully = false )
           );
      }
  }

}
