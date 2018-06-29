import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ff-lazyimg';
  images: any[];

  constructor() {
    this.images = [
      {src: "hej", srcset: "hej hje"},
      {src: "hej", srcset: "hej hje"},
      {src: "hej", srcset: "hej hje",order:1}
    ];
  }
}
