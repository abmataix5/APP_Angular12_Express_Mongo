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
  id_catego : string | null ;
  id_search : string | null;

  constructor( 
    private aRouter: ActivatedRoute,
    private _productoService: ProductoService) 
    {
      this.id_search = this.aRouter.snapshot.paramMap.get('search'); // cogemos la search de la URL
    this.id_catego = this.aRouter.snapshot.paramMap.get('nombre_catego'); // cogemos la categora de la URL
 
    }


  ngOnInit(): void {
    console.log(this.id_catego);
    console.log(this.id_search);
    this.getProductos();
  }

  getProductos() {

//Si tenemos categoria, busca los productos filtrandolos por categoria.

    if(this.id_catego  !== null){
     

      this._productoService.getProducto_catego(this.id_catego).subscribe(
        (data2) => {
          console.log(data2);
           this.listProductos = data2; 
        },
        (error) => {
        
          console.log(error);
        }
      );

    }else if(this.id_search !== null){ // Si no hay categoria, saca todos los productos
   

    
      this._productoService.getProducto_search(this.id_search).subscribe(
        (data) => {
          console.log(data);
          this.listProductos =data;
        },
        (error) => {
        
          console.log(error);
        }
      );
     
      

    }else{

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
