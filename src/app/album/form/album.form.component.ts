import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-album',
  templateUrl: './album.form.component.html'
})
export class AlbumFormComponent  implements OnInit {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected userService: UserService,
    protected auth: AuthService
  ) {
  }

  ngOnInit(): void {

  }
}
