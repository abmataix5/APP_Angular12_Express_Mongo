import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService,Categoria } from '../../core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  listCategorias: Categoria[] = [];
  scroll_items = 4;

  constructor( 
    private aRouter: ActivatedRoute,
    private router: Router, 
    private _categoriasService: CategoriesService) 
    {

     }

  ngOnInit(): void {
    this.getCategorias();
  }





  getCategorias() {

    this._categoriasService.getCategorias().subscribe(
      (data) => {
        console.log(data);
        this.listCategorias =data.slice(0,4);
        console.log(this.listCategorias);
      },
      (error) => {
      
        console.log(error);
      }
    );
  
  }


  onScroll(){

    this.scroll_items += 4;

    this._categoriasService.getCategorias().subscribe((data) => {
   
      this.listCategorias = data.slice(0,this.scroll_items)

      },
      (error) => {
      
        console.log(error);
      }
    );

  }
  




}
