import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <div class="container-fluid">

      <div class="row  justify-content-center m-5">
          <div class="col-md-10">
                    <router-outlet></router-outlet>
            </div>
        </div>

  </div>`
})
export class AppComponent {
  title = 'frontend-demo';
}
