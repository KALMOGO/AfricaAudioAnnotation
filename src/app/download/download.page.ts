import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DownloadService } from './download.page.service';
import { AudioRealNote_I } from './download.page.interface';
import * as papa from 'papaparse';
import { saveAs } from 'file-saver';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-download-page',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
  providers:[DownloadService]
})
export class DownloadPageComponent  implements OnInit {

  list_audioFinalNote:AudioRealNote_I[] = [];

  constructor( private router : Router,private navController: NavController,
              private download_service:DownloadService, private loadingCtrl: LoadingController ) {}

  ngOnInit() {
    this.get_Audio_final_Annotation()
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  async download_resultat_final() {

    const loading = await this.loadingCtrl.create({
      message: 'Connexion...',
      duration: 100,
      cssClass: 'custom-loading',
      spinner:'lines-sharp'
    });

    loading.present();

    loading.onDidDismiss().then(() => {
      this.exportToCsv(this.list_audioFinalNote, 'exported_data.csv');
    });

  }


  download_resultat_final_video(){}

  get_Audio_final_Annotation(){
    this.download_service.getAnnotationFinalResult()
    .subscribe(
      next=>{
        this.list_audioFinalNote = next;
      },
      error=>{
        console.log(error)
      },
      ()=>{
        console.log(this.list_audioFinalNote)
      }
    )
  }

  handleRefresh(event:any ) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  };

  exportToCsv(data: any[], fileName: string): void {
    const csvContent = papa.unparse(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, fileName);
  }

}
