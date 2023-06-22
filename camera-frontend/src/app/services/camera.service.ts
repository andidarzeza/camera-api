import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Camera } from '../model/camera';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private url = 'http://localhost:8080/api/cameras';

  constructor(
    private http:HttpClient
  ) { }

  findAll(page?:number, size?: number): Observable<Camera[]> {
      const params = new HttpParams().append("page", page.toString()).append("size", size.toString());
      return this.http.get<Camera[]>(`${this.url}/all`, {params});
  }

  save(camera: Camera, editMode: boolean): Observable<Camera> {    
    return editMode ? this.update(camera) : this.add(camera);
  }

  private add(camera:Camera): Observable<Camera> {
    return this.http.post<Camera>(`${this.url}/add`, camera);
  }

  private update(camera: Camera): Observable<Camera> {
    return this.http.put<Camera>(`${this.url}/${camera.id}`, camera);
  }

  delete(id:string){
    return this.http.delete(`${this.url}/delete/${id}`);  
  }

  find(id: string): Observable<Camera> {
    return this.http.get<Camera>(`${this.url}/${id}`);
  }
    
}
