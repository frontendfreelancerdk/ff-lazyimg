import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LazyimgComponent} from './lazyimg.component';
import {LazyimgService} from "./lazyimg.service"
import {By} from "@angular/platform-browser";


describe('LazyimgComponent', () => {
  let component: LazyimgComponent;
  let fixture: ComponentFixture<LazyimgComponent>;
  //TestBed.resetTestEnvironment();

  beforeEach(async(() => {
    const lazyImgService = jasmine.createSpyObj("LazyimgService", ["imageCounter", "loader"]);

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
    component.configuration = {src: "muhaha"};
    //console.log(JSON.stringify(de.nativeElement.className), "de --" );



  });

  it('should create a lazyimg Component', () => {
    /*  const fixture = TestBed.createComponent(LazyimgComponent);
      const component = fixture.debugElement.componentInstance;*/


    expect(component).toBeTruthy();
    fixture.detectChanges();

  });

  /*
    it('should create a lazyimg Component', () => {
      /!*  const fixture = TestBed.createComponent(LazyimgComponent);
        const component= fixture.debugElement.componentInstance;*!/

    });
  */
});



