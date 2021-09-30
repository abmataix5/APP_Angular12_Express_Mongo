import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarouselService, Carousel } from '../../core';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  
  listImages: Carousel[] = [];

  constructor( private aRouter: ActivatedRoute,private router: Router, private _carouselService: CarouselService) { }

  ngOnInit(): void {
    this.getCarousels();
  }

  getCarousels(){
console.log("Entra get carousel");

    this._carouselService.getCarousel().subscribe(
      (data) => {
        console.log(data);
        
        //this.listImages = data;
      },
      (error) => {
      
        console.log(error);
      }
    );
  }
}
