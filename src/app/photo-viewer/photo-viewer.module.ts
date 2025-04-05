import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoViewerRoutingModule } from './photo-viewer-routing.module';
import { PhotoViewerComponent } from './photo-viewer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhotoViewerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PhotoViewerRoutingModule
  ]
})
export class PhotoViewerModule { }
