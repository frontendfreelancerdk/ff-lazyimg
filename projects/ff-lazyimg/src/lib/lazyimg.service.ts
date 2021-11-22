// @ts-nocheck
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';

import {ILazyimgComponent} from './interfaces/ILazyimgComponent';
import {isPlatformBrowser} from '@angular/common';

@Injectable({providedIn: 'root'})
export class LazyimgService {
  private counter: number = 0;
  private images: ILazyimgComponent[] = [];
  private imagesToLoad: ILazyimgComponent[] = [];
  private hasLoadedAll: boolean = false;
  /**
   * @description calls the onloadhandler and resets the counter
   */
  private doLoad = () => {
    const images = this.imagesToLoad;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.startLoadHandler();
    }
    this.hasLoadedAll = true;
  };

  public sortImages = () => {
    this.imagesToLoad.sort((a, b) => {
        return a.order - b.order;
      }
    );
  };

  private setOrderIfUndefined = () => {
    const images = this.imagesToLoad;
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (!image.order) {
        image.order = this.counter;
      }
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // console.log('an lazyimg Service was constructed');
  }

  imageCounter(): number {
    this.counter += 1;
    return this.counter;
  }

  loader(obj: ILazyimgComponent) {
    this.images.push(obj);

    // if load is set to true add it to the to load array right away

    if (obj.load === true) {
      this.imagesToLoad.push(obj);
    }
    // if an image is added after constructing the view call the load handler if load is true. we do not need to add it to internal counting
    if (this.hasLoadedAll && obj.load === true) {
      obj.startLoadHandler();
    }
    // sort the images by order but only when all images is added - hence comparison to counter!!
    if (this.images.length === this.counter && isPlatformBrowser(this.platformId)) {
      // timeout ensures we only do this on next update cycle so all OnInit has been called
      window.setTimeout(() => {
        this.setOrderIfUndefined();
        this.sortImages();
        this.doLoad();
      }, 0);

    }
  }

}
