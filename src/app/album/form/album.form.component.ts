import { StatusResponse } from './../../data/status.response';
import { Album } from './../data/album';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild, ComponentFactoryResolver } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-create',
  templateUrl: './album.form.component.html'
})
export class AlbumFormComponent  implements OnInit, OnDestroy {

  subscription!: Subscription;
  error !: any | null;
  response !: StatusResponse<Album> | null;

  mForm: FormGroup = this.fb.group({
    albumName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    albumType: ['', [Validators.required]],
  });


  constructor(
    protected router: Router,
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('albumList')
      .pipe(map(state => state.httpResponse))
      .subscribe( (response: StatusResponse<Album> | null) => this.response = response );

    this.subscription = this.store
       .select('albumList')
       .pipe(map(state => state.httpError))
       .subscribe( (error: any | null) => this.error = error );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(e: Event): void {
     this.store.dispatch(new AlbumActions.CreateAlbum(this.mForm.getRawValue()));
  }


}
