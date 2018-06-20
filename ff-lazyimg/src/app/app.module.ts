import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LazyimgModule} from "lazyimg";
import { LazyimgComponent } from './lazyimg/lazyimg.component';


@NgModule({
  declarations: [
    AppComponent
,LazyimgComponent

  ],
  imports: [
    BrowserModule,
    LazyimgModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
