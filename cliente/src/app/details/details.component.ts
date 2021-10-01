import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto, ProductoService } from '../core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {


  detail: any;

  constructor(
    private route: ActivatedRoute, 
    private _productoService: ProductoService
  ){ 
    
  }


  ngOnInit(): void {

    // https://www.joshuacolvin.net/angular-subscribe-to-route-params-and-data/

    this.route.data.subscribe(
      (data) => {
      
        this.detail = data.details;
        console.log(this.detail);
      },
      (error) => {
      
        console.log(error);
      });
  
  }

}
