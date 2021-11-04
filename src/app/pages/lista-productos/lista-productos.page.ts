import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Producto{
  identificador: number,
  nombre: string,
  precio: number
};

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {

  lista: Producto[] = [];

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.create();
    this.storage.get('lista_productos').then((productos: Producto[])=>{
      for(let pro of productos){
        this.lista.push(pro);
      }
    });
  }

  eliminar(id){
    this.storage.create();
    this.storage.get('lista_productos').then((productos: Producto[])=>{
      this.lista=[];
      for(let pro of productos){
        if (id != pro.identificador) {
          this.lista.push(pro);
        }
      }
      this.storage.set('lista_productos', this.lista);
    });
  }

  modificar(id){
    
  }

}
