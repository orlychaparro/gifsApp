import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = '1XmARQHBFiEWFR5lTVpaEbgAA6Fx3ol1';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  // TODO: Camiar any por subtipo correspondiente
  public resultados : Gif[] = [];
  get historial(){
 
      return [...this._historial];
  }

  constructor (private http: HttpClient){

    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados =  JSON.parse(localStorage.getItem('ultimoResultado')!) || [];
    

  }

  buscarGifs( query:string = ''){

    query = query.trim().toLocaleLowerCase();

    if(! this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10); // limita a 10 elementos

      localStorage.setItem('historial', JSON.stringify(this._historial));
      
    }

    const params = new HttpParams( )
        .set('api_key',this.apiKey)
        .set('limit','10')
        .set('q',query);

        console.log(params.toString());


    this.http.get<SearchGifsResponse>(`${ this.servicioUrl}/search`,{ params})
    .subscribe( ( resp ) => {
      console.log(resp.data);
      
      this.resultados = resp.data;
      localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados));
      
    });

  }



}
