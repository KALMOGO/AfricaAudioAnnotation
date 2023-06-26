import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from './home.service';
import { Iuser } from './home.page.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers:[AuthenticationService]
})
export class HomePage implements OnInit{

  user!:Iuser;

  formAuthentication:FormGroup = new FormGroup({})

  constructor(private fb:FormBuilder, private loadingCtrl: LoadingController,
    private authService:AuthenticationService, private router: Router,
    private navController: NavController) {}


  ngOnInit(): void {
    this.formAuthentication = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6) ]]
    })

    //console.log("ok")
  }


  isUserNoconnected:boolean = true;

  OnsubmitForm(){
    this.user = {
      ...this.formAuthentication.value
    }

    let tokens:{access:string, refresh:string} = {access:"",refresh:"" }

    this.authService.login(this.user).subscribe(
      (result)=>{
        tokens = result.tokens || {access:"",refresh:"" };
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
        if(tokens.access.length==0){
          this.isUserNoconnected = true;
        }
        else{
          this.isUserNoconnected = false;
          localStorage.setItem("tokens", JSON.stringify(tokens) );
        }
      },
    )
  }


  async showLoading() {
    this.isModalOpen = false;
    const loading = await this.loadingCtrl.create({
      message: 'Connexion...',
      duration: 1000,
      cssClass: 'custom-loading',
      spinner:'lines-sharp'
    });

    loading.present();

    this.OnsubmitForm();


    loading.onDidDismiss().then(() => {

      if(this.isUserNoconnected==false){
        this.navigate();
      }
      else{
        console.log(this.isUserNoconnected)
      }
    });

  }

  handleRefresh(event:any ) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  };

  navigate(){
    this.navController.navigateForward('/main-page');
  }

  OncreateAccount(){this.router.navigate(['/account'])}

  go_download_data(){
    this.navController.navigateForward('/download');
  }

  async showLoading_download() {

    this.isModalOpen = false;

    const loading = await this.loadingCtrl.create({
      message: 'Connexion...',
      duration: 1000,
      cssClass: 'custom-loading',
      spinner:'lines-sharp'
    });

    loading.present();

    this.OnsubmitForm();


    loading.onDidDismiss().then(() => {

      if(this.isUserNoconnected==false){
        this.go_download_data();
      }
      else{
        console.log(this.isUserNoconnected)
      }
    });

  }

  //---------- modal download --------------

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
