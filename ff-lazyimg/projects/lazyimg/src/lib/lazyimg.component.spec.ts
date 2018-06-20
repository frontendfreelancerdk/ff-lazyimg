import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyimgComponent } from './lazyimg.component';

describe('LazyimgComponent', () => {
  let component: LazyimgComponent;
  let fixture: ComponentFixture<LazyimgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyimgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Lib component', () => {
    expect(component).toBeTruthy();
  });
});
