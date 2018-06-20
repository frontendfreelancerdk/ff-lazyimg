import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LazyimgComponent} from './lazyimg.component';
import {LazyimgService} from "./lazyimg.service"


describe('LazyimgComponent', () => {
  let component: LazyimgComponent;
  let fixture: ComponentFixture<LazyimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LazyimgComponent]/*,
      providers: [LazyimgService]*/
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyimgComponent);
    component = fixture.componentInstance;
    // seems this is causing problems when this is not in Library .
    // when pasting this to library component - investigate if this should be reinserted as it does not throw errors there
    // fixture.detectChanges();

  });

  it('should create a dimselidut', () => {
  /*  const fixture = TestBed.createComponent(LazyimgComponent);
    const component= fixture.debugElement.componentInstance;*/
    expect(component).toBeFalsy();
  });
});
