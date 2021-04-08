import { Component, OnInit } from '@angular/core';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-user',
  template: `
  <div class="row">
  <div class="col-md-12">
    <router-outlet></router-outlet>
  </div>
  </div>
  `
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
