import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainPagePage } from './main-page.page';
import { MainPageRoutingModule } from './main-page.routing.module';



@NgModule({
  declarations: [
    MainPagePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class MainPageModule { }
