import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {LazyimgService} from './lazyimg.service';
import {ILazyimgComponent} from './interfaces/ILazyimgComponent';


/**
 * while many discussions of testing private methods i decided to this
 * simply for the sake of documenting and easing the understanding for other developers.
 * you will see service["some_property"] which is need as typescript compiler will not access service.some_property when
 * private
 */
const createILazyimgComponent = (obj?: any): ILazyimgComponent => {
  const lazyImgComponent: ILazyimgComponent = {
    startLoadHandler: function () {
      return;
    },
    load: false,
    order: 0,
    src: '',
    srcset: '',
    applySources: false
  };
  if (obj) {
    return Object.assign(lazyImgComponent, obj);
  }
  return lazyImgComponent;
};
describe('LazyimgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyimgService]
    });
  });

  it('should be created', inject([LazyimgService], (service: LazyimgService) => {
    expect(service).toBeTruthy();
  }));

  it('counter prop should 0 at start', inject([LazyimgService], (service: LazyimgService) => {
    expect(service['counter']).toBe(0);
  }));

  it('will increment counter when imagecounter is called', inject([LazyimgService], (service: LazyimgService) => {
    expect(service['counter']).toBe(0);
    service.imageCounter();
    expect(service['counter']).toBe(1);

  }));
  it('will add passed Object to images Array', inject([LazyimgService], (service: LazyimgService) => {
    service.imageCounter();
    const imgComponent = createILazyimgComponent();
    service.loader(imgComponent);
    expect(service['images'][0]).toBe(imgComponent);
  }));

  it('will sort objects by the order prop ',
    inject([LazyimgService], fakeAsync((service: LazyimgService) => {
      service.imageCounter();
      service.imageCounter();
      const imgComponent1 = createILazyimgComponent({order: 2, load: true});
      const imgComponent2 = createILazyimgComponent({order: 1, load: true});
      service.loader(imgComponent1);
      service.loader(imgComponent2);
      tick();
      expect(service['imagesToLoad'][0]).toBe(imgComponent2);

    }))
  );


  it('will call the startLoadHandler on object', inject([LazyimgService], fakeAsync((service: LazyimgService) => {
    service.imageCounter();
    const imgComponent1 = createILazyimgComponent({order: 2, load: true});
    service.loader(imgComponent1);
    spyOn(imgComponent1, 'startLoadHandler');
    tick();
    expect(imgComponent1.startLoadHandler).toHaveBeenCalled();

  })));

  it('will call the startloadhandler when set to true later', inject([LazyimgService], fakeAsync((service: LazyimgService) => {
    const imgComponent1 = createILazyimgComponent({order: 2, load: true});
    const imgComponent2 = createILazyimgComponent({order: 2, load: true});
    service.imageCounter();
    spyOn(imgComponent2, 'startLoadHandler');
    spyOn(imgComponent1, 'startLoadHandler');

    service.loader(imgComponent1);
    expect(imgComponent2.startLoadHandler).not.toHaveBeenCalled();
    tick();
    expect(imgComponent1.startLoadHandler).toHaveBeenCalled();
    service.imageCounter();
    service.loader(imgComponent2);
    expect(imgComponent2.startLoadHandler).toHaveBeenCalled();
    tick();
  })));


  it('Can handle if load property is false', inject([LazyimgService], (service: LazyimgService) => {
    service.imageCounter();
    const imgComponent1 = createILazyimgComponent({order: 1, load: false});
    spyOn(imgComponent1, 'startLoadHandler');
    service.loader(imgComponent1);
    expect(imgComponent1.startLoadHandler).not.toHaveBeenCalled();
  }));

});
