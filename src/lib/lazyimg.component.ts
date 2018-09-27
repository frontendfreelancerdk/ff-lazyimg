import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ChangeDetectionStrategy
} from '@angular/core';

import {LazyimgService} from './lazyimg.service';
import {ILazyimgComponent} from './interfaces/ILazyimgComponent';
import {ILazyimgStyle} from './interfaces/ILazyimgStyle';
import {ILazyimgConfiguration} from './interfaces/ILazyimgConfiguration';


// @ts-ignore
@Component({
  selector: 'ff-lazyimg',
  templateUrl: './lazyimg.component.html',
  styleUrls: ['./lazyimg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyimgComponent implements OnInit, ILazyimgComponent, OnChanges {
  @Input() configuration: ILazyimgConfiguration;
  @Input() shouldLoad: boolean;

  @Output() imageInserted = new EventEmitter<any>();
  @Output() imageLoaded = new EventEmitter<any>();

  public src: string;
  public srcset: string;
  public order: number | undefined;
  public applySources: boolean = false;
  public style: ILazyimgStyle;
  public load: boolean;
  public name: string = '';

  constructor(public service: LazyimgService) {
    service.imageCounter();
  }

  ngOnChanges(changes: SimpleChanges) {
    const shouldLoad = changes.shouldLoad;
    if (shouldLoad) {
      this.load = shouldLoad.currentValue;
      if (this.load === true) {
        this.service.loader(this);
      }
    }
  }

  ngOnInit() {
    this.order = this.configuration.order;
    this.src = this.configuration.src;
    this.srcset = this.configuration.srcset;
    this.style = this.configuration.style || {};
    this.name = this.configuration.name;
    this.load = typeof this.shouldLoad === 'undefined' ? (typeof this.configuration.load === 'undefined' ? true : this.configuration.load) : this.shouldLoad;
    this.service.loader(this);
  }

  imageLoadedHandler(e) {
    this.imageLoaded.emit(e);
  }


  startLoadHandler() {
    this.imageInserted.emit(true);
    this.applySources = true;
  }


}
