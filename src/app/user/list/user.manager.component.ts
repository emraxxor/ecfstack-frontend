import { UserDataTable } from './user.data.table';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit, Component } from '@angular/core';
import {ItemEvent} from '../../component/table/event/item.event';

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
