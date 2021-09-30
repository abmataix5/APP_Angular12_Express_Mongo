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

  }

}
