// this is just because the other spec file was getting too big
// and i needed another template / testhost component for this anyway
import {async, inject, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {LazyimgComponent} from '../lazyimg.component';
import {LazyimgService} from '../lazyimg.service';
import {By} from '@angular/platform-browser';
import {ILazyimgConfiguration} from '../interfaces/ILazyimgConfiguration';
import {Component, ElementRef, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
//import {by} from 'protractor';


const createHostComponent = (config:any) => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  fixture = TestBed.createComponent(TestHostComponent);
  component = fixture.componentInstance;
  let base = {src: 'muhaha'};
  component.conf = {...base, ...config}
  ;
  return {fixture, component};
};


@Component({
  selector: 'ff-test-host-component',
  template: '<div class="container"><ff-lazyimg [configuration]="conf"></ff-lazyimg></div>'
})
export class TestHostComponent {
  @ViewChild(LazyimgComponent, {read: ElementRef, static: true}) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  public testComponent: ElementRef;
  @ViewChild(LazyimgComponent, {static: true}) /* using viewChild we get access to the TestComponent which is a child of TestHostComponent */
  public testComponentReal: LazyimgComponent;
  public conf: ILazyimgConfiguration;

}


describe('LazyimgComponent-2', () => {
  beforeEach(async(() => {
    const lazyImgService = jasmine.createSpyObj('LazyimgService', ['imageCounter', 'loader']);
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, LazyimgComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {

  });

  it('will set correct height when using ratio', () => {
    const {fixture, component} = createHostComponent({imageConfig: {dimensions: {ratio: 2}}});
    const container = fixture.debugElement.query(By.css('.container'));
    const native = container.nativeElement;
    let componentHeight;
    //    expect(component).toBeTruthy(); keep for debugging
    native.style.width = '400px';
    fixture.detectChanges();
    componentHeight = component.testComponent.nativeElement.offsetHeight;
    //fixture.detectChanges();
    expect(componentHeight).toBe(800);
  });

  it('will set correct height when using ratio with value below 1', () => {
    const {fixture, component} = createHostComponent({imageConfig: {dimensions: {ratio: 0.5}}});
    const container = fixture.debugElement.query(By.css('.container'));
    const native = container.nativeElement;
    let componentHeight;
    //    expect(component).toBeTruthy(); keep for debugging
    native.style.width = '400px';
    fixture.detectChanges();
    componentHeight = component.testComponent.nativeElement.offsetHeight;
    //fixture.detectChanges();
    expect(componentHeight).toBe(200);
  });


  it('will set correct height when No ratio BUT width and height defined', () => {
    const {fixture, component} = createHostComponent({imageConfig: {dimensions: {width: 1000, height: 500}}});
    const container = fixture.debugElement.query(By.css('.container'));
    const native = container.nativeElement;
    let componentHeight;
    //    expect(component).toBeTruthy(); keep for debugging
    native.style.width = '500px';
    fixture.detectChanges();
    componentHeight = component.testComponent.nativeElement.offsetHeight;
    //fixture.detectChanges();
    expect(componentHeight).toBe(250);
  });

  it('will height to the input value when nothing else is defined', () => {
    const {fixture, component} = createHostComponent({imageConfig: {dimensions: {height: 500}}});
    let componentHeight;
    fixture.detectChanges();
    componentHeight = component.testComponent.nativeElement.offsetHeight;
    //fixture.detectChanges();
    expect(componentHeight).toBe(500);
  });

  // test for https://github.com/frontendfreelancerdk/ff-lazyimg/issues/1
  it('will apply src attibute to img - when no output @imageInserted is set ', fakeAsync(() => {
    const {fixture, component} = createHostComponent({imageConfig: {dimensions: {height: 50}}, load: true, src: 'noimage'});
    fixture.detectChanges();
    const lazy = component.testComponentReal;
    lazy.ngOnInit();
    fixture.detectChanges();
    tick(1);

    const container = fixture.debugElement.query(By.css('img')).nativeElement;
    const expected = container.src.substring(container.src.length - component.conf.src.length, container.src.length);
    expect(expected).toBe('noimage');
  }));
});
