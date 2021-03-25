import { Image } from './../data/image';
import { ImageService } from './../services/image.service';
import { Album } from '../data/album';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as AlbumActions from '../store/album-list.actions';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album-list',
  styles: [`.masonry-item { max-width:200px; width: 200px;   transition: top 0.4s ease-in-out, left 0.4s ease-in-out;  }`],
  templateUrl: './album.list.component.html'
})
export class AlbumListComponent  implements OnInit, OnDestroy, AfterViewInit {

  album!: Album | null;

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  images: Array<Image> = [];

  mForm: FormGroup = this.fb.group({
    imageName: ['', Validators.required],
    imageDescription: ['', Validators.required],
  });

  imageData: string | null = null;

  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    percentPosition: true,
    fitWidth: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    protected fb: FormBuilder,
    private imageService: ImageService
  ) {
  }

  ngOnInit(): void {
        this.route.params
        .pipe(
          map(params => {
            return +params.id;
          }),
          map(id => {
              return this.store.dispatch(new AlbumActions.FetchAlbum(id));
          }),
          switchMap(id => {
              return this.store.select('albumList');
          })
        )
        .subscribe(albumList => {
          this.album = albumList.album;

          if ( this.album ) {
            this.imageService.images(this.album.id, 0).subscribe(
              res => {
                        const images = res.object.content as Array<Image>;
                        images.forEach(e => this.images.push(e));
              },
              err => console.error(err)
            );
          }

        });

  }

  ngAfterViewInit(): void {
    setTimeout( () => {  this.masonry.layout(); }, 300 );
  }

  ngOnDestroy(): void {
  }

  onSubmit(): void {
    if ( this.mForm.valid && this.imageData != null ) {
        const { imageName, imageDescription } = this.mForm.getRawValue();
        this.imageService.create( {
          name: imageName,
          albumId: (this.album as Album).id,
          description: imageDescription,
          data: this.imageData
        }).subscribe(
          res => console.log(res),
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


}
