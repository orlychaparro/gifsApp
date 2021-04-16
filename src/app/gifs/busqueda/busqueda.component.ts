import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBusacar!:ElementRef<HTMLInputElement>; // el ! indica es Nonnull assertion operator 
                                                  // como la variable no se inicializa y js dice
                                                  // que podria ser null, damos !.
  
    constructor(private GifsService: GifsService){

    }

    buscar( ) {
    
    const valor = this.txtBusacar.nativeElement.value;
    
      if (valor.trim().length === 0){
        return;
      }

    this.GifsService.buscarGifs(valor);

    this.txtBusacar.nativeElement.value = '';
  }
 

}
