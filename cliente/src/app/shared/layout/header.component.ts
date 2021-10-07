import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/core';

@Component({
  selector: 'app-layout',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  producto!: Producto;

  constructor() { }

  ngOnInit(): void {
  }

}
