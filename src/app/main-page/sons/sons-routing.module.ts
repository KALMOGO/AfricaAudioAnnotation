import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SonsPage } from './sons.page';

const routes: Routes = [
  {
    path: '',
    component: SonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SonsPageRoutingModule {}
