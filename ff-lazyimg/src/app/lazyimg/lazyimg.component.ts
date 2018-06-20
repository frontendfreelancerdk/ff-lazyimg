import {Component, Input, OnInit} from '@angular/core';
import {LazyimgService} from "./lazyimg.service"
import {ILazyimgComponent} from "./ILazyimgComponent";


@Component({
  selector: 'app-lazyimg',
  templateUrl: './lazyimg.component.html',
  styleUrls: ['./lazyimg.component.scss']
})
export class LazyimgComponent implements OnInit, ILazyimgComponent {
  @Input() configuration;
  public src: string;
  public srcset: string;
  public order: number | undefined;
  public applySources: boolean = false;


  constructor(private service: LazyimgService) {
    console.log("constructor", this.configuration);
    service.imageCounter();

  }

  ngOnInit() {
    this.order = this.configuration.order;
    this.src = this.configuration.src;
    this.srcset = this.configuration.srcset;
    this.service.loader(this);
  }


  onLoadHandler() {
    console.log("i get called", this.order);
    //   this.applySources = true;
  }


}
