import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {LoadingController, IonRange } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { SonsService } from './sons.page.service';
import { HomePage } from '../../home/home.page';
import { Router } from '@angular/router';
import { IAudioList, IAnnotation } from './sons.page.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sons',
  templateUrl: './sons.page.html',
  styleUrls: ['./sons.page.scss'],
  providers:[ DatePipe, SonsService],
})

export class SonsPage implements OnInit {
  @ViewChild('audioOption')
  audioPlayerRef!: ElementRef;

  @ViewChild('range')
  rangeRef!: ElementRef;

  tokens:any;
  progress = 0;
  component = HomePage;
  emojiList:any[] = [];
  musicList:IAudioList[] = [];

  url = 'https://ia800207.us.archive.org/29/items/MLKDream/MLKDream_64kb.mp3';
  loggedIn:boolean = true;

  position:number = 0;
  constructor(
    private toastController: LoadingController,
    private router: Router,
    private sonsService: SonsService,
    private cdr:ChangeDetectorRef
  ) {
    this.getListAudioAnnotateByUser();
  }

  seekbar = new FormControl();

  isModalOpen:boolean = false;

  ngOnInit(){
    this.getEmojiList();
    this.tokens = localStorage.getItem("tokens");
    this.getListAudioAnnotateByUser()
    this.getUserID();
  }

  num_Audio:number =  0;
  getListAudioAnnotateByUser(){

    this.sonsService.getListAudioAnnotateByUser().subscribe(
      (result:any)=>{
        this.musicList = result.results
        //console.log(result)
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        if(this.musicList.length!=0){
          this.url_music = this.path+this.musicList[0].path+this.alt+this.key;
          this.num_Audio = 0;

          if (this.musicList[0].annotation!= null){
            this.note = this.musicList[0].annotation.emotion;
            this.numAnnotate=0
          }
          else {this.note={id:0,emoji: '',name: ''}}

          this.audio.src = this.url_music
          this.audio.load();

        }

      }
    )
  }

  note:IAudioList["annotation"]["emotion"] = {id:0,emoji: '',name: ''};

  getEmojiList(){
    this.sonsService.getAllEmoji().subscribe(
      (result:any)=>{
        this.emojiList = result
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
      }
    )
  }

  path:string='https://www.googleapis.com/drive/v3/files/';
  url_music:string="";
  key:string='&key=AIzaSyBy2UzKRObPNKjVR6XT-GPNoiAtxRBIVG8';
  alt:string='?alt=media';


  getUrlMusicNext(){
      if (this.num_Audio<this.musicList.length-1){
      this.num_Audio+=1
    }else{
      this.num_Audio=this.musicList.length-1
    }

    this.loadAudio();
    this.is_play=false;

  }

  getUrlMusicPrevious(){
    if (this.num_Audio>0){
      this.num_Audio-=1
    }else{
      this.num_Audio=0
    }
    this.loadAudio();
    this.is_play=false;
  }

  loadAudio(){

    this.url_music = this.path+this.musicList[this.num_Audio].path+this.alt+this.key;
    this.audio.src=this.url_music

    if(this.musicList[this.num_Audio].annotation!=null) {
      this.note = this.musicList[this.num_Audio].annotation.emotion
    }
    else{
      this.note = {id:0,emoji: '',name: ''};
    }

  }


  logout(){
    this.router.navigate(['/home']);
    localStorage.clear();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: '...Annotation',
      duration: 100,

    });

    await toast.present();
  }

  OpenModal(){
    this.isModalOpen = true;
  }

    user:any;
  getUserID(){
    this.sonsService.getUserInfo().subscribe(
      (result)=>{
        this.user = result[0];
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        //console.log(this.user)
      }
    )
  }

  numAnnotate:number = 0
  note_title:string = 'pas annoter'
  setAnnotation(id:number){
    this.note = this.emojiList.filter(emoji=>emoji.id == id)[0]
    this.isModalOpen = false;

    if(this.musicList[this.num_Audio].annotation!=null){
      const id_note = this.musicList[this.num_Audio].annotation.id;
      this.updateAnnotationUser(id_note || 0);
    }
    else{

      this.postAnnotationUser();
    }
  }

  updateAnnotationUser(id:number){

    const data:IAnnotation = {
      id:id,
      emotion: this.note.id ,
      user: this.user.id ,
      audio: this.musicList[this.num_Audio].id || 0
    }

    this.sonsService.updateAnnotationAudio(data).subscribe(
      (result)=>{
        //console.log(result)
      },
      ()=>{},
      ()=>{
        this.musicList[this.num_Audio].annotation.emotion = this.note
        this.presentToast();
      }
    )
  }

  postAnnotationUser(){
    const data:IAnnotation = {
      emotion: this.note.id ,
      user: this.user.id ,
      audio: this.musicList[this.num_Audio].id || 0
    }

    this.sonsService.postAnnotationAudio(data).subscribe(
      (result)=>{
        //console.log(result)
      },
      ()=>{},
      ()=>{
        this.presentToast();
        this.numAnnotate+=1;
      }
    )
  }

  myRegisterFunction(){}


  playNow(el:any){
    this.isProgressBarDisplay = false;
  }

  isProgressBarDisplay=true;
  isLoadFinish:boolean = false;
  canPlay(){
    this.progress = 1;
    this.isLoadFinish = true;

  }


  duration:number = 0;
  is_play:boolean = false;


  audio = new Audio();
  play(){

    this.audio.play().then(()=>{
      this.updateProgress();
    })
    this.cdr.detectChanges(); // dection automatique du changement
    this.is_play=true;
    this.duration = this.audio.duration;
  }


  pause(){
    this.audio.pause();
    this.is_play=false;
  }

  updateProgress() {
    this.position = this.audio.currentTime
    if(this.position === this.audio.duration){
      this.pause();
    }

    setTimeout(() => {
      this.updateProgress();
    }, 1000);
  }


}

