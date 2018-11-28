import { NgModule } from '@angular/core';
import { LazyimgComponent } from './lazyimg.component';
import {CommonModule} from '@angular/common';
@NgModule({
  imports: [CommonModule
  ],
  declarations: [LazyimgComponent],
  exports: [LazyimgComponent]
})
export class FFLazyimgModule { }

