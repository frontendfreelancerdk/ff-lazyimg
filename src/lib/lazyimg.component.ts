import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy, ViewContainerRef, HostBinding, ChangeDetectorRef
} from '@angular/core';

import {LazyimgService} from './lazyimg.service';
import {ILazyimgComponent} from './interfaces/ILazyimgComponent';
import {ILazyimgStyle} from './interfaces/ILazyimgStyle';
import {ILazyimgConfiguration, ILazyimgImageConfig} from './interfaces/ILazyimgConfiguration';
import {LazyimgResizeService} from './resize-service/lazyimg-resize.service';

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
  @HostBinding('style.height') hostHeight: string;
  @HostBinding('style.width') hostWidth: string;


  public src: string;
  public srcset: string;
  public order: number | undefined;
  public applySources: boolean = false;
  public style: ILazyimgStyle;
  public load: boolean;
  public name: string = '';
  private breakpointValues: string[];
  private breakPoints: [any];

  constructor(private changeDetectoreRef: ChangeDetectorRef, private service: LazyimgService, private _viewContainerRef: ViewContainerRef, private lazyimgResizeService: LazyimgResizeService) {
// count all images before init
    service.imageCounter();
  }


  ngOnChanges(changes: SimpleChanges) {
    const shouldLoad = changes.shouldLoad,
      conf = changes.configuration;
    if (shouldLoad) {
      this.load = shouldLoad.currentValue;
      if (this.load === true) {
        this.service.loader(this);
      }
    }
    else if (conf) {
      this.load = conf.currentValue.load;
      this.service.loader(this);
    }
  }

  ngOnInit() {
    const imgConfig = this.configuration.imageConfig;
    this.order = this.configuration.order;
    this.src = this.configuration.src;
    this.srcset = this.configuration.srcset;
    this.style = this.configuration.style || {};
    this.name = this.configuration.name;
    this.load = typeof this.shouldLoad === 'undefined' ? (typeof this.configuration.load === 'undefined' ? true : this.configuration.load) : this.shouldLoad;

    if (this.configuration.srcByBreakpoint) {
      this.breakPoints = this.configuration.srcByBreakpoint;
      this.breakpointValues = this.orderBreakpoints(this.configuration.srcByBreakpoint);

      this.lazyimgResizeService.windowSize.subscribe((size) => {
        this.handleSizeChange(size);
      });
    }
    if (imgConfig) {
      if (imgConfig.dimensions) {
        this.handleLoadSize(imgConfig.dimensions);
      }
    }
//    this.startLoadSizeHandler(imgConfig);
    this.service.loader(this);
  }

  /*
   // TODO figure out if we can use this if height changes on the document-
   // if there is not a scrollbar when nginit runs the height will be calculated incorrect as the scrollbar takes some width

   private startLoadSizeHandler(imgConfig: ILazyimgImageConfig): void {
      if (imgConfig) {
        if (imgConfig.dimensions) {
          this.handleLoadSize(imgConfig.dimensions);
        }
      }
    }*/

  private handleSizeChange(size) {
    let defaultSrc = this.breakpointValues[0];
    for (let i = this.breakpointValues.length; i > 0; i--) {
      const breakpointValue = Object.keys(this.breakpointValues[i - 1])[0];
      if (size.width > breakpointValue) {
        defaultSrc = this.breakpointValues[i - 1];
        this.setNewSrc(defaultSrc[breakpointValue]);
        return;
      }
    }
    this.setNewSrc(defaultSrc[Object.keys(this.breakpointValues[0])[0]]);
  }

  private setNewSrc(value) {
    this.src = value;
    this.service.loader(this);
  }

  private orderBreakpoints(_breakpoints): [any] {
    return _breakpoints.sort((a, b) => {
      return parseInt(Object.keys(a)[0], 10) - parseInt(Object.keys(b)[0], 10);
    });
  }

  private getImageRatio(width: number, height: number): number {
    return height / width;
  }

  private calcHostHeight(width, ratio): string {
    return (width * ratio) + 'px';
  }

  private handleLoadSize(imageConfig: { ratio?: number; width?: number; height?: number; }) {
    let element;
    if (imageConfig.ratio) {
      if (imageConfig.ratio > 0) {
        element = this._viewContainerRef.element.nativeElement;
        this.hostHeight = this.calcHostHeight(element.offsetWidth, imageConfig.ratio);
      } else {
        throw new Error('Image ratio value must be bigger than 0');
      }
    } else {
      element = this._viewContainerRef.element.nativeElement;
      if (imageConfig.height && imageConfig.width) {
        const ratio = this.getImageRatio(imageConfig.width, imageConfig.height);
        this.hostHeight = this.calcHostHeight(element.offsetWidth, ratio);
      }
      else if (imageConfig.height) {
        this.hostHeight = imageConfig.height + 'px';
      }
    }
  }

  private setSizes() {

  }

  imageLoadedHandler(e) {
    this.hostHeight = this.hostWidth = '';
    if (this.imageLoaded.observers.length > 0) {
      this.imageLoaded.emit(e);
    }
    else {
      this.changeDetectoreRef.detectChanges();
    }
  }

  startLoadHandler() {
    this.applySources = true;
    // fixes https://github.com/frontendfreelancerdk/ff-lazyimg/issues/1
    if (this.imageInserted.observers.length > 0) {
      this.imageInserted.emit(true);
    } else {
      this.changeDetectoreRef.detectChanges();
    }
  }
}
