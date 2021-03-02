import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import * as fromApp from '../store/album-list.reducer';
import * as AlbumActions from '../store/album-list.actions';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-create',
  templateUrl: './album.form.component.html'
})
export class AlbumFormComponent  implements OnInit {


  mForm: FormGroup = this.fb.group({
    albumName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    albumType: ['', [Validators.required]],
  });


  constructor(
    protected router: Router,
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    protected userService: UserService,
    protected auth: AuthService,
    private store: Store<fromApp.State>
  ) {
  }

  ngOnInit(): void {
  }


  onSubmit(): void {
      this.store.dispatch(new AlbumActions.CreateAlbum(this.mForm.getRawValue()));
  }

}
