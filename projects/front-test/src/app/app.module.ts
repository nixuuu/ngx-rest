import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxRestModule} from "ngx-rest";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SecondModuleModule} from "./second-module/second-module.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxRestModule.forRoot({
      baseUrl: 'https://jsonplaceholder.typicode.com'
    }),
    SecondModuleModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
