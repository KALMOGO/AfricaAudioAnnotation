import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Iuser } from './home.page.interface';



@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

private httpOptions: any;


constructor(private http: HttpClient) {
}

public login(user: Iuser):Observable<any> {
  const endpoint = "http://127.0.0.1:8000/auth/login/";
  const end = environment.apiUrl+"/auth/login/"

  return this.http.post(end, user);
}

public logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user_id')
}

  // return l'etat de l'authentification
isAuthenticated():boolean{
if (localStorage.getItem('token') ) return true
return false
}



}
