import {async, inject, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LazyimgComponent} from './lazyimg.component';
import {LazyimgService} from './lazyimg.service';
import {By} from '@angular/platform-browser';
import {ILazyimgConfiguration} from './Interfaces/ILazyimgConfiguration';
import {SimpleChange, SimpleChanges} from '@angular/core';


describe('LazyimgComponent', () => {
  let component: LazyimgComponent;
  let fixture: ComponentFixture<LazyimgComponent>;
  //TestBed.resetTestEnvironment();


  beforeEach(async(() => {
    const lazyImgService = jasmine.createSpyObj('LazyimgService', ['imageCounter', 'loader']);

    TestBed.configureTestingModule({
      declarations: [LazyimgComponent],
      providers: [{provide: LazyimgService, useValue: lazyImgService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyimgComponent);
    component = fixture.componentInstance;
    // TODO is this comment still valid ?
    // seems this is causing problems when this is not in Library .
    // when pasting this to library component - investigate if this should be reinserted as it does not throw errors there

    /*  let de = fixture.debugElement.query(By.css(".ff-lazyimg")),
      el =de.nativeElement;*/
    component.configuration = {src: 'muhaha'};
    //console.log(JSON.stringify(de.nativeElement.className), "de --" );


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
    inject([LazyimgService], (service) => {
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

  it('Will not call #service.loader when #shouldLoad is not passed to ngOnChanges', inject([LazyimgService], (service) => {
    component.configuration = {src: 'some', load: false};
    component.ngOnInit();
    component.ngOnChanges({
      dummy: new SimpleChange(null, false, true)
    });

    expect(component.load).toBe(false);
    expect(service.loader).toHaveBeenCalledTimes(1);


  }));
});



