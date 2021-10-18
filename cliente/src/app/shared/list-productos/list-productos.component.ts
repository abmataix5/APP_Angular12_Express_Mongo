import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService,Producto } from '../../core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})

export class ListProductosComponent implements OnInit {

  listProductos: Producto[] = [];
  id_catego : string | null ;
  id_search : string | null;

  page = 1;     // por defecto nos situamos en la primera pagina.
  limit = 2;    //numero de produtos que mostramos
  offset = 0;   // offset por defecto, nos muestra los primeros productos.

  count = 0;
  // pageSize = 2;
 

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

  getRequestParams(limit: number, offset: number, page:number): any {
    let params: any = {};
    if(page){
      offset=(page-1)*limit;        //definimos valor offser respecto pagina en la que nos encontramos.
    }

    if (offset) {
      params[`limit`] = limit;
    }

    if (offset) {
      params[`offset`] = offset;
    }

    console.log(params[`offset`]);
    console.log(params[`limit`]);

  
    return params;
  }


  getProductos() {

//Si tenemos categoria, busca los productos filtrandolos por categoria.

const params = this.getRequestParams(this.limit, this.offset, this.page);


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
      // if(params != ""){

      // }else{
          this._productoService.getProductos(params).subscribe(
            (data) => {

              console.log("entra getproductos");
              console.log(data.products);
              console.log(data.totalProductos);

              this.listProductos = data.products; //array de productos
              this.count=data.totalProductos;     // numero paginaciones
            },
            (error) => {
            
              console.log(error);
            }
          );
      // }
  }
    
  }

  //cada vez que se ejecute el evento changePage lanza getProductos.

  handlePageChange(event:number):void{
    this.page = event;
    console.log("valor event"+ event);
    this.getProductos();


  }

}
