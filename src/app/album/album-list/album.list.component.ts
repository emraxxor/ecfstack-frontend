import { ImageService } from '../services/image.service';
import { Album } from '../data/album';
import {map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import {AlbumImage} from '../data/AlbumImage';
import {LoadingService} from '../../services/loading.service';
import {Subject, Subscription} from 'rxjs';


/**
 * AlbumListComponent is suitable for creating and displaying albums.
 *
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-list',
  styles: [`.masonry-item { max-width:200px; width: 200px;   transition: top 0.4s ease-in-out, left 0.4s ease-in-out;  }`],
  templateUrl: './album.list.component.html',
  providers : [
    LoadingService
  ],
})
export class AlbumListComponent  implements OnInit, OnDestroy, AfterViewInit {

  album!: Album | null;
  albumId!: number;

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  images = new Array<AlbumImage>();

  page = 0;

  mForm = new FormGroup({
     imageName: new FormControl('', [Validators.required]),
     imageDescription: new FormControl('', [Validators.required])
  });


  imageData: string | null = null;

  readonly imageChanges = new Subject<AlbumImage>();

  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    // percentPosition: true,
    // fitWidth: true,
  };

  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    protected formBuilder: FormBuilder,
    private imageService: ImageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this
          .route
          .params
          .pipe(
            map(params => {
              return params.id;
            }),
            map(id => {
                this.albumId = id;
                return this.store.dispatch(new AlbumActions.FetchAlbum(id));
            }),
            switchMap(id => {
                return this.store;
            }),
            withLatestFrom(e => e.albumList),
            takeUntil(this.unsubscribeNotifier)
          )
          .subscribe(albumList => {
            if ( albumList.album && Number(this.albumId as number) === Number(albumList.album.id) ) {
              this.album = albumList.album;
              this.fetchAlbum();
            }
            this.loadingService.endLoad();
          });

    this
          .imageChanges
          .pipe(takeUntil(this.unsubscribeNotifier))
          .subscribe(res => {
            this.images.push(res);
          });

  }

  private fetchAlbum(): void {
    if ( this.album ) {
      this
        .loadingService
        .displayLoader(this.imageService.images(this.album.id, this.page++))
        .pipe(
          takeUntil(this.unsubscribeNotifier),
          map( e => e.object.content as Array<AlbumImage>)
        )
        .subscribe(
          res => res.forEach( e => this.imageChanges.next(e)),
          err => console.error(err)
        );
    }
  }

  ngAfterViewInit(): void {
    setTimeout( () => {
      if ( this.masonry ) {
        this.masonry.layout();
      }
    }, 300 );
  }

  ngOnDestroy(): void {
    this.store.dispatch(new AlbumActions.ResetAlbumList());
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  onSubmit(): void {
    if ( this.mForm.valid && this.imageData != null ) {
        const { imageName, imageDescription } = this.mForm.getRawValue();
        this.imageService
        .create( {
          name: imageName,
          albumId: (this.album as Album).id,
          description: imageDescription,
          data: this.imageData
        }).subscribe(
          res => {
              this.images.push(res.object);
          },
          err => console.log(err)
        );
    }
  }

  itemsLoaded(): void {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  handleFileInput(e: any): void {
    this.imageData = e.data;
  }

  handleClickMore($event: MouseEvent): void {
      this.fetchAlbum();
  }
}
