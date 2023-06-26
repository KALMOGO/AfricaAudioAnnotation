import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AudioRealNote_I } from './download.page.interface';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {

private httpOptions: any;

readonly endpoint = environment.apiUrl + "/notes/audio/resume/list"
  token: any;

constructor(private http: HttpClient) {
  this.token = JSON.parse(localStorage.getItem("tokens") || '')

  this.httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token.access
      })
  }
}

getAnnotationFinalResult():Observable<any>{
  return this.http.get<AudioRealNote_I[]>(this.endpoint, this.httpOptions)
}

}
