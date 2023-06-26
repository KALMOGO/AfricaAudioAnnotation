import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {
  LoadingController,
  Platform,
  ToastController
} from '@ionic/angular';
import { DatePipe } from '@angular/common';

import { HomePage } from '../../home/home.page';
import { VideosService } from './videos.service';
import { SonsService } from '../sons/sons.page.service';
import { IAudioList, IEmotion } from '../sons/sons.page.interface';
import { IAnnotationVideo, IVideoList } from './videos.page.interface';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
  providers:[ DatePipe, SonsService,VideosService]
})
export class VideosPage implements OnInit {
  @ViewChild('myVideo') myVideo!: ElementRef;
   progress = 0;
   component = HomePage;
  emojiList:any[] = [];
  videoList:IVideoList[] = [];

  url = 'https://ia800207.us.archive.org/29/items/MLKDream/MLKDream_64kb.mp3';

  loggedIn:boolean = true;
  constructor(
    private platform: Platform,
    private toastController: LoadingController,
    private toastCtrl: ToastController,
    private datePipe: DatePipe,
    private sonsService: SonsService,
    private videoService : VideosService,
    private cdr:ChangeDetectorRef
  ) {
    setInterval(() => {
      this.progress += 0.01;

      if (this.progress > 1 && this.isLoadFinish==false) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);

    this.getvideosList();

  }


  isModalOpen:boolean = false;

  ngOnInit(){
    this.getEmojiList();
  }

  note:IVideoList["annotation"]["emotion"] = {id:0,emoji: '',name: ''};
  getEmojiList(){
    this.sonsService.getAllEmoji().subscribe(
      (result:any)=>{
        this.emojiList = result;
        //console.log(result)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        this.note.emoji = this.emojiList[0].emoji;
        this.note.name = this.emojiList[0].name;
        console.log(this.note)
      }
    )
  }

  path:string='https://www.googleapis.com/drive/v3/files/';
  currentVideoSrc:string="";
  key:string='&key=AIzaSyBy2UzKRObPNKjVR6XT-GPNoiAtxRBIVG8';
  alt:string='?alt=media';

  num_video:number =  0;
  isPlaying : boolean = false;
  getvideosList(){
    this.videoService.getAllVideo().subscribe(
      (result)=>{
        this.videoList = result
        console.log(this.videoList)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        if(this.videoList.length!=0 ){
          this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
          this.num_video = 1;
        }
      }
    )
  }


  getUrlVideo(id:number){
   // this.currentVideoSrc = 'https://drive.google.com/drive/folders/1XI29tyuHNYnmkkMm8JdRwHLL-6yzm97f';

    const video = this.myVideo.nativeElement;
    //video.src=this.currentVideoSrc
    console.log(video.src)


    if(id == 0){
      if(this.num_video!=2)
        this.num_video += 1;
        this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
        video.src=this.currentVideoSrc;
    }else{
      if(this.num_video!=0 && this.num_video!=1 )
        this.num_video -= 1;
        this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
    }

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
        console.log(this.user)
      }
    )
  }

  note_title:string = 'pas annoter'
  setAnnotation(id:number){

    this.note = this.emojiList.filter(emoji=>emoji.id == id)[0]
    this.isModalOpen = false;

    // const id_note = this.videoList[this.num_video].annotation.id;


    // if(this.videoList[this.num_video].annotation!=null) this.updateAnnotationUser(id_note || 0);
    // else this.postAnnotationUser();
  }

  updateAnnotationUser(id:number){

    const data:IAnnotationVideo = {
      id:id,
      emotion: this.note.id ,
      user: this.user.id ,
      video: this.videoList[this.num_video].id || 0
    }

    this.videoService.updateAnnotationVideo(data).subscribe(
      (result)=>{
        //console.log(result)
      },
      ()=>{},
      ()=>{
        this.presentToast();
      }
    )
  }

  postAnnotationUser(){
    const data:IAnnotationVideo = {
      emotion: this.note.id ,
      user: this.user.id ,
      video: this.videoList[this.num_video].id || 0
    }

    this.videoService.postAnnotationVideo(data).subscribe(
      (result)=>{
        //console.log(result)
      },
      ()=>{},
      ()=>{
        this.presentToast();
      }
    )
  }

  playVideo() {
    // this.isPlaying = true;
    // this.myVideo.nativeElement.play();

  }

  pauseVideo() {
    this.isPlaying = false;
    this.myVideo.nativeElement.pause();
  }

  stopVideo() {
    this.myVideo.nativeElement.currentTime = 0;
    this.myVideo.nativeElement.pause();
  }


  // https://drive.google.com/drive/folders/1XI29tyuHNYnmkkMm8JdRwHLL-6yzm97f

  // cle : AIzaSyA7hFZLW3Umn11F8MhB20AcZJDwtYSpQiM

  precedentVideo() {
   // this.currentVideoIndex = this.currentVideoIndex - 1;
    if(this.currentVideoIndex >0){
      this.currentVideoIndex -=1;
      //
      this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
      this.myVideo.nativeElement.play();
    }else{
      this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
      this.myVideo.nativeElement.play();
    }

  }

  suivantVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoList.length;
    this.currentVideoSrc = this.path+this.videoList[this.currentVideoIndex].path+this.alt+this.key;
    this.myVideo.nativeElement.play();

  }



  //videos: string[] = ['http://localhost:8100/assets/video/video1.mp4', 'http://localhost:8100/assets/video/video2.mp4'];
  currentVideoIndex: number = 0;




  changeVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoList.length;
    const videoSource = this.videoList[this.currentVideoIndex];
    this.myVideo.nativeElement.setAttribute('src', videoSource);
    if (this.myVideo.nativeElement && this.myVideo.nativeElement.play && this.myVideo.nativeElement.load) {
      this.myVideo.nativeElement.load();
      this.myVideo.nativeElement.play();
    } else {
      console.error('myVideo.nativeElement is not correctly initialized');
    }
  }

  onVideoEnded() {

    this.changeVideo();
  }

  logout(){}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,

    });

    await toast.present();
  }

  OpenModal(){
    this.isModalOpen = true;
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

}
