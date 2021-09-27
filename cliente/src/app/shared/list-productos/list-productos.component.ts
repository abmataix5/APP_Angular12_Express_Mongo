import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {

  constructor( private aRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

}
