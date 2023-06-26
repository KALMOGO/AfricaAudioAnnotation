import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { IEmotion, IAnnotation } from './sons.page.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SonsService {

  private token:any;
private httpOptions: any;

endpoint = "../../../assets/db/emoji.json"

endpointMusic = "../../../assets/db/music.json"

constructor(private http: HttpClient) {
  this.token = JSON.parse(localStorage.getItem("tokens") || '')

  this.httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.token.access
      })
  }
}

getUserInfo():Observable<any>{
  const end = environment.apiUrl+"/auth/user/list/"
  return this.http.get(end, this.httpOptions);
}

getListAudioAnnotateByUser():Observable<any>{
  const end = environment.apiUrl+"/notes/audio/mark/"
  return this.http.get<any>(end, this.httpOptions);
}

getListAudioToBeAnnoted():Observable<any>{
  const end = environment.apiUrl+"/notes/audio/mark/"
  return this.http.get<any>(end, this.httpOptions)
}

getAllEmoji():Observable<any>{
  const end = environment.apiUrl+"/notes/emotion/list/"
  return this.http.get<IEmotion[]>(end, this.httpOptions);
}

postAnnotationAudio(data:IAnnotation):Observable<any>{
  const end = environment.apiUrl+"/notes/audio/post/"
  return this.http.post(end, data,this.httpOptions);
}

updateAnnotationAudio(data:IAnnotation):Observable<any>{
  const end = environment.apiUrl+"/notes/audio/" +data.id +"/update/";
  return this.http.patch(end, data, this.httpOptions);
}


}
