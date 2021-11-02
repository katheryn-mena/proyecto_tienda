import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

export interface Producto{
  identificador: number,
  nombre: string,
  precio: number
};

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
  }

  producto = new FormGroup({
    identificador: new FormControl(),
    nombre: new FormControl(),
    precio: new FormControl()
  });

  add(){
    let p: Producto;
    p = {
      identificador: this.producto.controls.identificador.value,
      nombre: this.producto.controls.nombre.value,
      precio: this.producto.controls.precio.value
    };
    this.agregarProducto(p);
    alert("Producto agregado");
  }

  agregarProducto(producto: Producto){
    this.storage.create();
    this.storage.get('lista_productos').then((productos: Producto[])=>{
      let existe: boolean = false;
      for(let p of productos){
        if (producto.identificador == p.identificador) {
          existe = true;
          break;
        }
      }
      if (existe) {
        alert('El producto ya existe')
      }else{
        if (!productos) {
          this.storage.set('lista_productos', [producto]);
        }else{
          productos.push(producto);
          this.storage.set('lista_productos', productos);
        }
      }
      alert(this.storage.get('lista_usuarios'));
    });
  }
}
