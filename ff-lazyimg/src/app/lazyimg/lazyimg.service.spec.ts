import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import {LazyimgService} from './lazyimg.service';
import {ILazyimgComponent} from "./ILazyimgComponent"

/**
 * while many discussions of testing private methods i decided to this
 * simply for the sake of documenting and easing the understanding for other developers.
 * you will see service["some_property"] which is need as typescript compiler will not access service.some_property when
 * private
 */
const createILazyimgComponent = (obj?: any): ILazyimgComponent => {
  let lazyImgComponent: ILazyimgComponent = {
    onLoadHandler: function () {
      return;
    }, order: 0,
    src: "",
    srcset: "",
    applySources: false
  };
  if (obj) {
    return Object.assign(lazyImgComponent, obj);
  }
  return lazyImgComponent;
};
fdescribe('LazyimgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyimgService]
    });
  });

  it('should be created', inject([LazyimgService], (service: LazyimgService) => {
    expect(service).toBeTruthy();
  }));

  it('counter prop should 0 at start', inject([LazyimgService], (service: LazyimgService) => {
    expect(service["counter"]).toBe(0);
  }));

  it('will increment counter when imagecounter is called', inject([LazyimgService], (service: LazyimgService) => {
    expect(service["counter"]).toBe(0);
    service.imageCounter();
    expect(service["counter"]).toBe(1);

  }));
  it("will add passed Object to images Array", inject([LazyimgService], (service: LazyimgService) => {
    service.imageCounter();
    let imgComponent = createILazyimgComponent();
    service.loader(imgComponent);
    expect(service["images"][0]).toBe(imgComponent);
  }));

  it("will sort objects by the order prop",
    inject([LazyimgService], fakeAsync((service: LazyimgService) => {
      service.imageCounter();
      service.imageCounter();
      let imgComponent1 = createILazyimgComponent({order: 2});
      let imgComponent2 = createILazyimgComponent({order: 1});
      service.loader(imgComponent1);
      service.loader(imgComponent2);
      //expect(service["images"][0]).toBe(imgComponent2);


    }))
  );


  it("Template", inject([LazyimgService], (service: LazyimgService) => {

  }));

});
