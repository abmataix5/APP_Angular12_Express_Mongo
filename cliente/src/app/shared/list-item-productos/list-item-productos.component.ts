import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/core';

@Component({
  selector: 'app-list-item-productos',
  templateUrl: './list-item-productos.component.html',
  styleUrls: ['./list-item-productos.component.css']
})
export class ListItemProductosComponent implements OnInit {

// con @input accedemos a los datos enviado por el selector <app-list-item-productos>
  @Input()       
     
  producto!: Producto;

  constructor() { }

  ngOnInit(): void {
console.log(this.producto);
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
