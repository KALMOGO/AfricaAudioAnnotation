import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';


@Component({
  selector: 'app-main',
  templateUrl: 'main-page.page.html',
  styleUrls: ['main-page.page.scss'],
})
export class MainPagePage implements OnInit{
  component = HomePage;
  constructor(private router: Router,) {}

  ngOnInit(): void {}

  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);

  }
}
