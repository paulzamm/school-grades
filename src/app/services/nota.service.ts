import { Injectable } from '@angular/core';
import { Nota } from '../interfaces/nota';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private notas: Nota[] = [];
  private myappUrl: string;
  private myapiUrl: string;
  private myUrl: string;

  constructor(private http: HttpClient) {
    this.myappUrl = environment.apiUrl;
    this.myapiUrl = 'notas/';
    this.myUrl = this.myappUrl + this.myapiUrl;
   }
  
  createNota(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.myUrl, nota);
  }

  getNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.myUrl);
  }

  deleteNota(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myUrl}${id}`);
  }
   
}
  