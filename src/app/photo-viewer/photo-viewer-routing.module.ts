import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoViewerComponent } from './photo-viewer.component';

const routes: Routes = [{ path: '', component: PhotoViewerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoViewerRoutingModule { }
