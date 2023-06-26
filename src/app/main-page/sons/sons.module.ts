import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SonsPageRoutingModule } from './sons-routing.module';
import { SonsPage } from './sons.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SonsPageRoutingModule
  ],
  declarations: [SonsPage],

})
export class SonsPageModule {}
