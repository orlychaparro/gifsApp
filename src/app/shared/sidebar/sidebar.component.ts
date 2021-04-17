import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent  {

 
   valores: string[] = [];

  get historial(){

      return this.GifsService.historial;
      
  } 
 
  
  constructor( private GifsService: GifsService) {
    //this.valores =  ['aaa','bbb','ccc'];
   // this.valores =  GifsService.historial;
    //console.log(GifsService.historial);
    //localStorage.getItem(this.historial.entries());

   }

   buscar(termino:string){
     console.log(termino)
     this.GifsService.buscarGifs(termino);
   }

}
