import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoViewerRoutingModule } from './photo-viewer-routing.module';
import { PhotoViewerComponent } from './photo-viewer.component';


@NgModule({
  declarations: [
    PhotoViewerComponent
  ],
  imports: [
    CommonModule,
    PhotoViewerRoutingModule
  ]
})
export class PhotoViewerModule { }
