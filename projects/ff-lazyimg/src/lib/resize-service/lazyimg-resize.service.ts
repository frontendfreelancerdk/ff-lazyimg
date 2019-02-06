import {Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, Observable, fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

interface IwindowSize {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class LazyimgResizeService {
  public windowSize: BehaviorSubject<IwindowSize> = new BehaviorSubject(this.getSize());
//  public windowSize: Observable<IwindowSize> = new Observable<IwindowSize>();

  public observable = new Observable();

  constructor() {
// TODO this could be simplified so we dont need 2 observales / Behavioursubjects
    fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(x => this.windowSize.next(this.getSize(x)));

  }

  private getSize(e?): IwindowSize {
    console.log(' LazyimgResizeService isPlatformBrowser(PLATFORM_ID)', isPlatformBrowser(PLATFORM_ID));
    if (isPlatformBrowser(PLATFORM_ID)) {
      if (e) {
        return {width: e.target.innerWidth, height: e.target.innerHeight};
      }
      return {width: window.innerWidth, height: window.innerHeight};
    } else {
      return {width: 0, height: 0};
    }
  }
}
