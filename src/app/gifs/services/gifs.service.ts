import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '1XmARQHBFiEWFR5lTVpaEbgAA6Fx3ol1';
  private _historial: string[] = [];
  // TODO: Camiar any por subtipo correspondiente
  public resultados : Gif[] = [];
  get historial(){
 
      return [...this._historial];
  }

  constructor (private http: HttpClient){}

  buscarGifs( query:string = ''){

    query = query.trim().toLocaleLowerCase();

    if(! this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // limita a 10 elementos
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=1XmARQHBFiEWFR5lTVpaEbgAA6Fx3ol1&q=${ query}&limit=10`)
    .subscribe( ( resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      
    });

  }



}
