import { Component,  Input,OnInit } from '@angular/core';
import { Categoria } from 'src/app/core';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent implements OnInit {

  @Input()    

  categoria!: Categoria;
  
  constructor() { }

  ngOnInit(): void {
  }

}
