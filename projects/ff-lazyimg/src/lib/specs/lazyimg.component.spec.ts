import {async, inject, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LazyimgComponent} from '../lazyimg.component';
import {LazyimgService} from '../lazyimg.service';
import {ILazyimgConfiguration} from '../interfaces/ILazyimgConfiguration';
import {Component, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'ff-test-host-component',
  template: '<ff-lazyimg [configuration]="conf"></ff-lazyimg>'
})
export class TestHostComponent {
  @ViewChild(LazyimgComponent, {static: true}) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  public testComponent: LazyimgComponent;
  public conf: ILazyimgConfiguration = {load: false, src: ''};
  /* this is the variable which is passed as input to the TestComponent */
}


describe('LazyimgComponent', () => {
  let component: LazyimgComponent;
  let fixture: ComponentFixture<LazyimgComponent>;
  //TestBed.resetTestEnvironment();

  beforeEach(async(() => {
    const lazyImgService = jasmine.createSpyObj('LazyimgService', ['imageCounter', 'loader']);

    TestBed.configureTestingModule({
      declarations: [TestHostComponent, LazyimgComponent],
      providers: [{provide: LazyimgService, useValue: lazyImgService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyimgComponent);
    component = fixture.componentInstance;
    component.configuration = {src: 'muhaha'};
  });

  it('should create a lazyimg Component', () => {
    /*  const fixture = TestBed.createComponent(LazyimgComponent);
      const component = fixture.debugElement.componentInstance;*/
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('will set #load to true if neither configuration or shouldLoad is implemented ', () => {
    spyOn(component, 'ngOnChanges');
    component.ngOnInit();
    expect(component.ngOnChanges).not.toHaveBeenCalled();
    expect(component.load).toBe(true);

  });

  it('should set #load property correct when passing "true" in "shouldLoad"', () => {
    spyOn(component, 'ngOnChanges');
    component.shouldLoad = true;
    component.ngOnInit();
    expect(component.load).toBe(true);
    expect(component.ngOnChanges).not.toHaveBeenCalled();
  });

  it('should set #load property correct when passing "false" in "shouldLoad"', () => {
    spyOn(component, 'ngOnChanges');
    component.shouldLoad = false;
    component.ngOnInit();
    expect(component.load).toBe(false);
    expect(component.ngOnChanges).not.toHaveBeenCalled();
  });


  it('should set #load property correct when passing "false" in #configuration.load', () => {
    spyOn(component, 'ngOnChanges');
    component.configuration = {src: '', load: false};
    component.ngOnInit();
    expect(component.load).toBe(false);
    expect(component.ngOnChanges).not.toHaveBeenCalled();
  });


  it('should set #load property correct when passing "true" in #configuration.load', () => {
    spyOn(component, 'ngOnChanges');
    component.configuration = {src: '', load: true};
    component.ngOnInit();
    expect(component.load).toBe(true);
    expect(component.ngOnChanges).not.toHaveBeenCalled();
  });

  it('should set #load to the value provided on ngChanges and call #service.loader if true',
    inject([LazyimgService], (service:any) => {
      component.configuration = {src: ''};
      component.configuration = {src: '', load: false};
      component.ngOnInit();
      // spyOn(service, 'loader');
      expect(component.load).toBe(false);
      //   const change = new SimpleChanges({"some":true});
      component.ngOnChanges({
        shouldLoad: new SimpleChange(null, false, true)
      });
      expect(component.load).toBe(false);
      expect(service.loader).toHaveBeenCalledTimes(1);

      component.ngOnChanges({
        shouldLoad: new SimpleChange(null, true, true)
      });
      expect(component.load).toBe(true);
      expect(service.loader).toHaveBeenCalledTimes(2);
    }));

  it('Will not call #service.loader when #shouldLoad is not passed to ngOnChanges', inject([LazyimgService], (service:any) => {
    component.configuration = {src: 'some', load: false};
    component.ngOnInit();
    component.ngOnChanges({
      dummy: new SimpleChange(null, false, true)
    });
    expect(component.load).toBe(false);
    expect(service.loader).toHaveBeenCalledTimes(1);
  }));


  it('will load when object is replaced with a configuration with load true', inject([LazyimgService], (service:any) => {
    component.configuration = {src: 'some', load: false};
    component.ngOnInit();
    expect(component.load).toBe(false);
    component.ngOnChanges({
      configuration: new SimpleChange(null, {load: true}, true)
    });
    expect(component.load).toBe(true);
    // in init and after changes
    expect(service.loader).toHaveBeenCalledTimes(2);
  }));

  it('handleLoad will throw an error if ratio is less than 0', () => {
    component.configuration = {src: 'some', load: false, imageConfig: {dimensions: {ratio: -42}}};
    expect(() => component.ngOnInit()).toThrowError('Image ratio value must be bigger than 0');
  });

  it('getImageRatio (private) will return ratio as defined in interface', () => {
    expect(component['getImageRatio'](1000, 500)).toBe(0.5);
  });

  // https://github.com/frontendfreelancerdk/ff-lazyimg/issues/3
  it('will always set height property even when imageConfig is not defined ', fakeAsync(() => {
    component.configuration = {src: 'some', load: false};
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    tick(1);
    expect(component.hostHeight).toBe('0px');

  }));


  /*
  this does not currently work due to a bug
  https://github.com/angular/angular/issues/12313
  suggested workarounds is tried without succes at 09 october 2018

    it('should load when changing load and replacing #configuration object', inject([LazyimgService], fakeAsync((service) => {
        const _fixture = TestBed.createComponent(TestHostComponent);
        const testHostComponent = _fixture.componentInstance;
        const lazyInstance = testHostComponent.testComponent;
        spyOn(lazyInstance, 'ngOnChanges');
        expect(lazyInstance.ngOnChanges).not.toHaveBeenCalled();
        testHostComponent.conf = {src: '', load: true};
        expect(service.loader).toHaveBeenCalledTimes(0);
        _fixture.detectChanges();
        expect(lazyInstance.ngOnChanges).toHaveBeenCalled();
        expect(lazyInstance.load).toBe(true);
        expect(service.loader).toHaveBeenCalledTimes(1);
      }
    )))
    ;*/

});



