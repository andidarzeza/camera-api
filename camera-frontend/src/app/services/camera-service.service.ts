import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Camera } from '../model/camera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraServiceService {
  private url = 'http://localhost:8080/api/cameras';
  constructor(private http:HttpClient) { }

  findAll(page?:number, size?: number): Observable<any> {
      const httpParams: HttpParams = new HttpParams().append("page", page.toString()).append("size", size.toString());
      return this.http.get<Camera[]>(`${this.url}/all`, {params: httpParams, observe: 'response'});
  }

  add(camera:Camera): Observable<Camera> {
    return this.http.post<Camera>(`${this.url}/add`, camera);
  }

  delete(id:string){
    return this.http.delete(`${this.url}/delete/${id}`);  
  }

  find(id: string): Observable<Camera> {
    return this.http.get<Camera>(`${this.url}/${id}`);
  }

  update(id: string, camera: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, camera);
  }
    
}
