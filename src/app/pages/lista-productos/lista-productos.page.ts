import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  productito = new FormGroup({
    identificadorcito: new FormControl(),
    nombrecito: new FormControl(),
    precito: new FormControl()
  });

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

  modificar(){
    var producto: any;
    producto = {
      identificador: this.productito.controls.identificadorcito.value,
      nombre: this.productito.controls.nombrecito.value,
      precio: this.productito.controls.precito.value
    }
    this.storage.create();
    this.storage.get('lista_productos').then((productos: Producto[])=>{
      this.lista = [];
      for (let pro of productos){
        if (producto.identificador == pro.identificador) {
          this.lista.push(producto);
        }else{
          this.lista.push(pro);
        }
      }
      this.storage.set('lista_productos', this.lista);
    });
  }

}
