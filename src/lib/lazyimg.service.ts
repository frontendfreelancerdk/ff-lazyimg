import {Injectable} from '@angular/core';
import {ILazyimgComponent} from "./ILazyimgComponent";

@Injectable({
  providedIn: 'root'
})
export class LazyimgService {
  private counter: number = 0;
  private images: ILazyimgComponent[] = [];

  private doLoad = () => {
    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];
      image.onLoadHandler();
    }
  };
  private sortImages = () => {
    this.images.sort((a, b) => {
        return a.order - b.order;
      }
    );
  };

  private setOrderIfUndefined = () => {
    for (let i = 0; i < this.images.length; i++) {
      const image = this.images[i];
      if (!image.order) {
        image.order = this.counter;
      }
    }
  };

  constructor() {
  }

  imageCounter() {
    this.counter += 1;
  }

  loader(obj: ILazyimgComponent) {
    this.images.push(obj);
    //sort the images by order but only when all images is added - hence comparioson to counter!!
    if (this.images.length === this.counter) {
      window.setTimeout(() => {
        this.setOrderIfUndefined();
        this.sortImages();
        this.doLoad();
      }, 0);

    }

  }

}
