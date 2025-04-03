import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {PhotoViewerModule} from "./photo-viewer/photo-viewer.module";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    LoginModule,
    RegisterModule,
    PhotoViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
