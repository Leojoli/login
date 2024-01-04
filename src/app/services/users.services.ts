import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environments';
import { Observable, catchError, take } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})

export class UserService {
private apiURL = environment.API_URL
  constructor(private http:HttpClient) { }

  getUser(): Observable<any>{
    return this.http.get<any>(this.apiURL)
  }  

  

  putUser(id: number, token:any):Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(`${this.apiURL}/${id}`, token, { headers })
  }
 

}
