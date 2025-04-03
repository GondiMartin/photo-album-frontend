import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./guard/auth.guard";

const routes: Routes = [
    {
      path: 'register',
      loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'myphotos',
        loadChildren: () => import('./photo-viewer/photo-viewer.module').then(m => m.PhotoViewerModule),
        canActivate: [authGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'myphotos'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
