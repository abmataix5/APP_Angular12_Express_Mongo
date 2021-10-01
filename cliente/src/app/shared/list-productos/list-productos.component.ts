import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService,Producto } from '../../core';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})

export class ListProductosComponent implements OnInit {

  listProductos: Producto[] = [];
  id : string | null ;

  constructor( 
    private aRouter: ActivatedRoute,
    private _productoService: ProductoService) 
    {
    this.id = this.aRouter.snapshot.paramMap.get('nombre_catego'); // cogemos la categora de la URL
    }


  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {

//Si tenemos categoria, busca los productos filtrandolos por categoria.

    if(this.id ){

      this._productoService.getProducto_catego(this.id).subscribe(
        (data2) => {
          console.log(data2);
           this.listProductos = data2; 
        },
        (error) => {
        
          console.log(error);
        }
      );

    }else{ // Si no hay categoria, saca todos los productos
      
      this._productoService.getProductos().subscribe(
        (data) => {
          console.log(data);
          this.listProductos =data;
        },
        (error) => {
        
          console.log(error);
        }
      );

    }
     
    
  }

}
