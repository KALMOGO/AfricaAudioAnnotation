import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagePage } from './main-page.page';

const routes: Routes = [
  {
    path: '',
    component:MainPagePage ,

    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutPageModule),
      },
      {
        path: 'music',
        loadChildren: () =>
          import('./sons/sons.module').then((m) => m.SonsPageModule),
      },
      {
        path: 'video',
        loadChildren: () =>
          import('./videos/videos.module').then((m) => m.VideosPageModule),
      },

      {
        path: '',
        redirectTo: '/main-page/music',
        pathMatch: 'full',
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
