import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../core';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  constructor( private aRouter: ActivatedRoute,private router: Router, private _productoService: ProductoService,) { }


  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {

      this._productoService.getProductos().subscribe(
        (data) => {
          console.log(data);

        },
        (error) => {
        
          console.log(error);
        }
      );
    
  }

}
