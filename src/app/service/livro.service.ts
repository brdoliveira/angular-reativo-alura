import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { LivrosResultado } from '../models/volumes-resultado.model';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<LivrosResultado>{
      const params = new HttpParams().append('q', valorDigitado)
      return this.http.get<LivrosResultado>(this.API, { params })

      // .pipe(
      //   tap((res) => console.log("Fluxo do tap = ", res)),
      //   map((res) => res.items ?? []),
      //   tap((res) => console.log("Fluxo apos o map = ", res)),
      // )
  }
}
