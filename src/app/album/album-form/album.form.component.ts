import {StatusCode, StatusResponse} from '../../data/status.response';
import { Album } from '../data/album';
import {map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { OnInit, Component, OnDestroy} from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';
import {LoadingService} from '../../services/loading.service';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent} from '../../shared/ui/dialog/alert.dialog.component';
import {selectAlbumHttpResponse} from "../store/album-list.reducer";
import {AlbumService} from "../../services/album.service";

export enum FormType {
   CREATE,
   UPDATE
}

/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-create',
  templateUrl: './album.form.component.html',
  providers: [
    LoadingService
  ]
})
export class AlbumFormComponent implements OnInit, OnDestroy {

  error !: any | null;
  response !: StatusResponse<Album> | null;
  formType = FormType.CREATE;
  album: Album | null | undefined;
  albumId: number | undefined;
  formIsSubmitted = false;

  private unsubscribeNotifier = new Subject<void>();

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
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.formType = params.id != null ? FormType.UPDATE : FormType.CREATE;
      if ( this.formType === FormType.UPDATE ) {
        this.initForm();
      }
    });

    this.store
      .pipe(takeUntil(this.unsubscribeNotifier), withLatestFrom(e => e.albumList.httpResponse))
      .subscribe( (response: StatusResponse<Album> | null) => {
           // this.response = response
          if ( this.formIsSubmitted ) {
            if (response?.code === StatusCode.OK) {
              if (this.formType === FormType.CREATE) {
                this.dialog.open(AlertDialogComponent, {
                  width: '40%',
                  data: {
                    title: 'Alert',
                    text: 'Album is created successfully!'
                  }
                });
              } else if (this.formType === FormType.UPDATE) {
                this.dialog.open(AlertDialogComponent, {
                  width: '40%',
                  data: {
                    title: 'Alert',
                    text: 'Album is updated successfully!'
                  }
                });
              }
            } else {
              if (response && response.code === StatusCode.INVALID) {
                this.dialog.open(AlertDialogComponent, {
                  width: '40%',
                  data: {
                    title: 'Alert',
                    text: 'Something went wrong, try again later!'
                  }
                });
              }
            }
            this.formIsSubmitted = false;
          }
      });


    this.store
       .select(s => s.albumList.httpError)
       .pipe(takeUntil(this.unsubscribeNotifier))
       .subscribe( (error: any | null) => this.error = error );
  }

  ngOnDestroy(): void {
    this.store.dispatch(new AlbumActions.ResetAlbumList());
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  onSubmit(e: Event): void {
    if ( this.formType === FormType.CREATE ) {
      this.store.dispatch(new AlbumActions.CreateAlbum(this.mForm.getRawValue()));
    } else if ( this.formType === FormType.UPDATE ) {
      this.store.dispatch(new AlbumActions.UpdateAlbum({ ...this.mForm.getRawValue(), id: this.albumId }));
    }
    this.formIsSubmitted = true;
  }

  private initForm(): void {
    this.loadingService.displayLoader(
      this
        .route
        .params
        .pipe(
          map(params => {
            return +params.id;
          }),
          map(id => {
            this.albumId = id;
            return this.store.dispatch(new AlbumActions.FetchAlbum(id));
          }),
          switchMap(id => {
            return this.store.select(s => s.albumList.album);
          })
        )
    ).subscribe(
      album => {
        this.album = album;
        if ( this.album ) {
          this.mForm.patchValue(this.album);
        }
        this.loadingService.endLoad();
      } ,
      err => this.loadingService.endLoad(),
      () => this.loadingService.endLoad());

  }

}
