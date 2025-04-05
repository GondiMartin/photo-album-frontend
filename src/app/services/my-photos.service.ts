import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class MyPhotosService extends BaseService{

  private readonly MY_PHOTOS_URL = environment.API_URL + "/photos";

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    super();
  }

  upload(image: Image): Observable<Image> {
    return this.http.post<Image>(this.MY_PHOTOS_URL, image);
  }

  getAll(userId: number): Observable<Image[]>{
    const params: HttpParams = new HttpParams().set('userId', userId);
    return this.http.get<Image[]>(this.MY_PHOTOS_URL, { 
      headers: this.getHeaders(),
      params: params
    });
  }

  delete(imageId: number): Observable<void> {
    const params: HttpParams = new HttpParams().set("imageId", imageId);
    return this.http.delete<void>(this.MY_PHOTOS_URL, {
      headers: this.getHeaders(),
      params: params
    });
  }
}
