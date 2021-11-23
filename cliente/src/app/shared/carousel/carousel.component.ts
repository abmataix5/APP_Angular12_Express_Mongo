import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarouselService, Carousel } from '../../core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {



 images:any = []; //declaramos como any, para que sea iterable.

  constructor( private aRouter: ActivatedRoute,private router: Router, private _carouselService: CarouselService) { }

  ngOnInit(): void {
    this.getCarousels();
  }

  getCarousels(){
    console.log("Entra get carousel");

    this._carouselService.getCarousel().subscribe(
      (data) => {
        console.log(data);
        this.images=data;
        
      },
      (error) => {
      
        console.log(error);
      }
    );
  }

//Para usar el carousel tenemos que tener instalado bootstrap
// npm install bootstrap
// npm install bootstrap --save
// npm update
// ng add @ng-bootstrap/ng-bootstrap
// en el doc => angular.json => incluir en el styles:
//     "styles": [
//                  "node_modules/bootstrap/dist/css/bootstrap.min.css"
//               ] 

}
