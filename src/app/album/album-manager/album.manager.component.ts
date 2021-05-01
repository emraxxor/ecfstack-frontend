import { Router, ActivatedRoute } from '@angular/router';
import { ItemEvent } from '../../component/table/event/item.event';
import { HttpClient } from '@angular/common/http';
import { AlbumDataTable } from './album.data.table';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-album-manager-component',
  templateUrl: './album.manager.component.html'
})
export class AlbumManagerComponent  implements OnInit {

  dataTable = new AlbumDataTable(this.http);

  constructor(
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
  }

  onItemClicked(e: ItemEvent): void {
    this.router.navigate(['/album', e.row.columns.id]);
  }


}
