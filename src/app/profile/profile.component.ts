import { FileData } from './../type/file.data';
import { Subject } from 'rxjs';
import { User } from './../data/user';
import { StatusCode, StatusResponse } from './../data/status.response';
import { AuthService } from './../services/auth.service';
import { ProfilePage } from './profile.type';
import { UserFormComponent } from './../form/user.form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageComponent } from '../component/ui/image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends UserFormComponent implements OnInit {

  @ViewChild('profileImage', { static: true }) profileImage!: ImageComponent;


  mForm: FormGroup = this.fb.group({
    userMail: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address : [''],
    city: [''],
    state : [''],
    zip: ['', [ Validators.pattern('^[0-9]*$') ]]
  });

  page = ProfilePage.SETTINGS;
  profileUpdated = false;
  profileFormValidated = false;
  ProfilePage = ProfilePage;
  profileImageSubject = new Subject<FileData>();

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected userService: UserService,
    protected auth: AuthService
  ) {
    super(router, route, fb, userService);
  }

  ngOnInit(): void {
      this.userService.info().subscribe(
        e => this.mForm.setValue({
          userMail: e.userMail,
          firstName: e.firstName,
          lastName: e.lastName,
          address: e.address,
          city: e.city,
          state: e.state,
          zip: e.zip
        })
      );

      this.userService.image().subscribe(
        res => {
          if ( res.code === StatusCode.OK ) {
            this.profileImageSubject.next(res.object);
          }
        }
      );

  }

  onSubmit(): void {
    if ( this.mForm.valid ) {
        this.userService.update(this.mForm.getRawValue())
            .subscribe(
                (e: StatusResponse<User>) => this.profileUpdated = e.code === StatusCode.OK,
                (error: any) => this.profileUpdated = false,
                () => this.profileFormValidated = true
            );
    }
  }


  handleFileInput(e: any): void {
    this.userService.updateImage(e)
     .subscribe(
       res => {
          if ( res.code === StatusCode.OK ) {
              this.userService.image().subscribe(
                res => {
                    if ( res.code === StatusCode.OK ) {
                      this.profileImageSubject.next(res.object);
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
