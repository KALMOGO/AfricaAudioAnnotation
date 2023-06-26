import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { HttpClientModule } from '@angular/common/http';
import { DownloadPageRoutingModule } from './download-routing.module';
import { DownloadPageComponent } from './download.page';


@NgModule({
  declarations: [DownloadPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DownloadPageRoutingModule,
    HttpClientModule,
  ],
})
export class DownloadModule { }
