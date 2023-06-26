import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnotation } from '../sons/sons.page.interface';
import { IAnnotationVideo } from './videos.page.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private token:any;
  private httpOptions: any;
 

  endpoint = "../../../assets/db/emoji.json"

  endPointVideo = environment.apiUrl + "/notes/Video/list/";
  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem("tokens") || '')

    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + this.token.access,
        })
    }
  }



  getAllVideo():Observable<any>{
    return this.http.get(this.endPointVideo,this.httpOptions)
  }

  getAllByIdVideo(id:number):Observable<any>{
    return this.http.get(this.endPointVideo+"/"+id,this.httpOptions)
  }

  postAnnotationVideo(data:IAnnotationVideo):Observable<any>{
    const endpoint = environment.apiUrl + "/notes/video/post/";
    return this.http.post(endpoint, data,this.httpOptions);
  }
  
  updateAnnotationVideo(data:IAnnotationVideo):Observable<any>{
    const endpoint = environment.apiUrl + "/notes/video/" +data.id +"/update/";
    return this.http.patch(endpoint, data, this.httpOptions);
  }
}
