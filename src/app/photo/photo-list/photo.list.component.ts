import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {PhotoService} from '../services/photo.service';
import {PhotoElement} from '../data/photo.element';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PhotoDialogWindowComponent} from "./photo.dialog.window.component";

/**
 * PhotoListComponent is suitable for displaying pictures .
 *
 * @author Attila Barna
 */
@Component({
  selector: 'app-photo-list',
  templateUrl: './photo.list.component.html',
  providers : [
    LoadingService
  ],
})
export class PhotoListComponent  implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  token = '';

  images: Array<PhotoElement> = [];

  readonly imageChanges: Subject<PhotoElement> = new Subject<PhotoElement>();

  private dialogRef: MatDialogRef<PhotoDialogWindowComponent> | undefined;

  masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    columnWidth: 200
  };

  private unsubscribeNotifier = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();

    this
      .imageChanges
      .pipe(takeUntil(this.unsubscribeNotifier))
      .subscribe(res => {
        this.images.push(res);
      });
  }

  private fetchData(): void {
     this.photoService.images(this.token).pipe(
          map( e => e.data )
     ).subscribe( res => res.forEach( e => this.imageChanges.next(e) ));
  }

  handleClickMore($event: MouseEvent): void {
      this.fetchData();
  }

  ngAfterViewInit(): void {
    setTimeout( () => {
      if ( this.masonry ) {
        this.masonry.layout();
      }
    }, 300 );
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next();
    this.unsubscribeNotifier.complete();
  }

  itemsLoaded(): void {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  onShowImage(item: PhotoElement, $event: MouseEvent): void {
    this.dialogRef = this.dialog.open(PhotoDialogWindowComponent, {
      width: '80%',
      data: { item }
    });
  }
}
