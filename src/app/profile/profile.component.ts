import {FileData} from '../type/file.data';
import {Subject} from 'rxjs';
import {User} from '../data/user';
import {StatusCode, StatusResponse} from '../data/status.response';
import {ProfilePage} from './profile.type';
import {UserFormComponent} from '../form/user.form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ImageComponent} from '../component/ui/image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends UserFormComponent implements OnInit {

  @ViewChild('profileImage', { static: true }) profileImage!: ImageComponent;

  settingsForm: FormGroup = this.fb.group({
    userMail: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address : [''],
    city: [''],
    state : [''],
    zip: ['', [ Validators.pattern('^[0-9]*$') ]]
  });

  passwordForm = this.fb.group({
    oldPassword : ['', [Validators.required, Validators.minLength(2)]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPasswordConfirm: ['', [Validators.required, Validators.minLength(8)]]
  }, { validators: [this.checkPasswordsAreEqual] });

  page = ProfilePage.SETTINGS;
  profileUpdateType: ProfilePage | null = null;
  profileUpdated = false;
  profileFormValidated = false;
  ProfilePage = ProfilePage;
  profileImageSubject = new Subject<FileData>();

  get passwordControl(): AbstractControl | null {
    return this.passwordForm.get('newPassword');
  }

  get confirmPasswordControl(): AbstractControl | null {
    return this.passwordForm.get('newPasswordConfirm');
  }

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userService: UserService,
  ) {
    super(router, route, fb, userService);
  }

  ngOnInit(): void {
      this.userService.info().subscribe(e => this.settingsForm.patchValue(e));

      this.userService.image().subscribe(
        res => {
          if ( res.code === StatusCode.OK ) {
            this.profileImageSubject.next(res.object);
          }
        }
      );

  }

  onSubmitSettings(): void {
    if ( this.settingsForm.valid ) {
        this.userService.update(this.settingsForm.getRawValue())
            .subscribe(
                (e: StatusResponse<User>) => this.profileUpdated = e.code === StatusCode.OK,
                (error: any) => this.profileUpdated = false,
                () => ( this.profileFormValidated = true, this.profileUpdateType = ProfilePage.SETTINGS )
            );
    }
  }

  onSubmitPassword(): void {
    if ( this.passwordForm.valid ) {
      this.userService.updatePassword(this.passwordForm.getRawValue())
        .subscribe(
          (e: StatusResponse<User>) => this.profileUpdated = e.code === StatusCode.OK,
          (error: any) => this.profileUpdated = false,
          () => (this.profileFormValidated = true, this.profileUpdateType = ProfilePage.PASSWORD)
        );
    }
  }

  checkPasswordsAreEqual(c: AbstractControl): ValidationErrors | null {
    const password = c.get('newPassword');
    const confirmPassword = c.get('newPasswordConfirm');
    if ( password && confirmPassword && !password.pristine && !confirmPassword.pristine && password.value === confirmPassword.value ) {
      return null;
    }
    return [ {invalid: true} ];
  }

  handleFileInput(e: any): void {
    this.userService.updateImage(e)
     .subscribe(
       res => {
          if ( res.code === StatusCode.OK ) {
              this.userService.image().subscribe(
                (sres: StatusResponse<FileData>) => {
                    if ( sres.code === StatusCode.OK ) {
                      this.profileImageSubject.next(sres.object);
                    }
                }
              );
          }
       },
       err => {}
     );

  }

  changePage(e: ProfilePage): void {
    this.page = e;
  }


}
