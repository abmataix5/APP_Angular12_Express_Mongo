import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto, ProductoService } from '../core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {

  producto!: Producto;


  constructor(
    private route: ActivatedRoute, 
    private _productoService: ProductoService
  ){ 
    
  }


  ngOnInit(): void {

    // https://www.joshuacolvin.net/angular-subscribe-to-route-params-and-data/

    this.route.data.subscribe(
      (data) => {

        this.producto = data.details.producto;
      },
      (error) => {
      
        console.log(error);
      });
  
  }


  onToggleFavorite(favorited: boolean) {

    this.producto.favorited = favorited;

    /* Si es like, suma +1 */
    if (favorited && typeof this.producto.favoritesCount === 'number') {
      this.producto.favoritesCount++;
    }
    
    /* Si el dislike, resta -1 al total de likes */
    if (!favorited && typeof this.producto.favoritesCount === 'number') {
      this.producto.favoritesCount--;
    } 
  }

}
