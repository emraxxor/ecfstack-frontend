import { Component, OnInit } from '@angular/core';


/**
 * @author Attila Barna
 */
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
})
export class PhotoComponent implements OnInit {

  constructor() {
    console.log('PHOTO COMPONENT!');
  }

  ngOnInit(): void {
  }

}
