import { Component, OnInit } from '@angular/core';
import { ILanguage, ICreateAccount } from './account.page.interface';
import { accountCreateService } from './account.page.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../home/home.service';
import { Iuser } from '../home/home.page.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers:[accountCreateService, AuthenticationService  ]
})
export class AccountPage implements OnInit {

  language_list:ILanguage[] = [];
  user_info:ICreateAccount[] = [];
  UserAccountInfoForm:FormGroup = new FormGroup({});

  profil_list:string[]=["Lettre", "Illetre"]

  constructor(private accountService:accountCreateService, private router: Router,
    private fb:FormBuilder, private loadingCtrl: LoadingController,
    private authService:AuthenticationService,
    ) { }

  ngOnInit() {
    this.UserAccountInfoForm = this.fb.group({
      email: ["", [Validators.email]],
      first_name:["", [Validators.required]] ,
      job:["", [Validators.required]] ,
      gender: [true, [Validators.required]] ,
      last_name: ["", [Validators.required]],
      language:  [0, [Validators.required]],
      password:["", [Validators.required, Validators.minLength(8)]]
    });

    this.getLanguages();
  }

  logout(){
    this.router.navigate(['/home'])
  }

  currentFood = undefined;

  user:Iuser = {
    email: '',
    password: ''
  };
  createUserAccount(){

    this.showLoading();
    const user:ICreateAccount = {
      username:this.UserAccountInfoForm.get("last_name")?.value,
      ...this.UserAccountInfoForm.value
    }

    this.accountService.createAccount(user).subscribe(
      (data:any)=>{
        console.log(data)
      },
      (error)=>{
        console.log(error)
      },
      ()=>{
        this.user.email = user.email;
        this.user.password = user.password;

        this.login(this.user);
      }
    )
  }

  login(user:Iuser){
    let tokens:{access:string, refresh:string} = {access:"",refresh:"" }

    this.authService.login(user).subscribe(
      (result)=>{
        tokens = result.tokens || {access:"",refresh:"" }
      },
      (error)=>{},
      ()=>{
        if(tokens.access.length!=0){
          localStorage.setItem("tokens", JSON.stringify(tokens) );
          this.navigate();
        }

      },
    )
  }

  navigate(){this.router.navigate(['/main-page'])}
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      cssClass: 'custom-loading',
      spinner:'lines-sharp'
    });

    loading.present();

    loading.onDidDismiss().then(() => {
    });

  }

  getLanguages(){
    this.accountService.getAllLanguage().subscribe(
      (languages:ILanguage[])=>{
        this.language_list = languages;
      },
      (error:any)=>{
        console.log(error)
      },
      ()=>{

      }
    )
  }
  // selection fonction
  compareWith(o1:any, o2:any) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  }

}
