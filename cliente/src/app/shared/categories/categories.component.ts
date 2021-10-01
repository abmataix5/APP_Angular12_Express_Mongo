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

  constructor( 
    private aRouter: ActivatedRoute,
    private router: Router, 
    private _categoriasService: CategoriesService) {

     }

  ngOnInit(): void {
    this.getCategorias();
  }





  getCategorias() {

    this._categoriasService.getCategorias().subscribe(
      (data) => {
        console.log(data);
        this.listCategorias =data;
      },
      (error) => {
      
        console.log(error);
      }
    );
  
  }
}
