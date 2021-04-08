import { UserDataTable } from './user.data.table';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from './../../component/table/event/page.event';
import { ItemEvent } from './../../component/table/event/item.event';
import { HttpClient } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';

@Component({
  selector: 'app-user-manager-component',
  templateUrl: './user.manager.component.html'
})
export class UserManagerComponent  implements OnInit {

  dataTable = new UserDataTable(this.http);

  constructor(
      private http: HttpClient,
      private router: Router,
      private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
  }

  onItemClicked(e: ItemEvent): void {
  }


}
