import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


    keyword :any;
    busca : any;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  search_prod(event : any){

  this.router.navigate(['shop/search/',this.keyword]);  
  }

  search(event: any) {

    this.keyword = event.target.value; // Recogemos los crietrios de busqueda
 
  }

}
