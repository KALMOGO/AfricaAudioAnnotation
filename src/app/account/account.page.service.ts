import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateAccount, ILanguage } from './account.page.interface';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class accountCreateService {

private httpOptions: any;


apiURL = "http://127.0.0.1:8000/"


readonly endpoint = environment.apiUrl + "/auth/signup/"
readonly endpointLanguage = environment.apiUrl + "/auth/language/"

constructor(private http: HttpClient) {}

public createAccount(user: ICreateAccount):Observable<ICreateAccount> {
  return this.http.post<ICreateAccount>(this.endpoint, user);
}

public getAllLanguage():Observable<ILanguage[]>{
  return this.http.get<ILanguage[]>(this.endpointLanguage);
}


}
