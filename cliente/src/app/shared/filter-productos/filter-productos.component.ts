import { Component, OnInit , EventEmitter,Input,Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria, Filter,CategoriesService} from 'src/app/core';

@Component({
  selector: 'app-filter-productos',
  templateUrl: './filter-productos.component.html',
  styleUrls: ['./filter-productos.component.css']
})
export class FilterProductosComponent implements OnInit {
    
  listCategorias : Categoria[] = []
  aRouterFilters !: string | null;
  filters: Filter = new Filter;
  categoriaSeleccionada: any;
  estadoSeleccionado : any;
  ubicacionSeleccionada:any;

  @Output() filterEvent: EventEmitter<Filter> = new EventEmitter();

  constructor(private aRouter: ActivatedRoute,
    private _categoriasService: CategoriesService) {

   }

  listEstados:string[]=["Nuevo","Seminuevo","Usado"];
  listUbicacion:String[]=["Alicante","Ontinyent","Valencia"];
  seleccionado:string []=[];

  ngOnInit(): void {
    this.getCategorias();    
  }

  getCategorias() {

    this._categoriasService.getCategorias().subscribe(
      (data) => {
        this.listCategorias =data;
      },
      (error) => {
        console.log(error);
      }
    );
  
  }//end getCategorias

  public changeEvent() {
    
    this.filters.limit = 4;
    this.filters.offset = 0;
    this.filters.stateFilter=true;
    

    if(this.categoriaSeleccionada){
     
      this.filters.categoria=this.categoriaSeleccionada;
      this.searchEmit();
    }
    if(this.estadoSeleccionado){
   
      this.filters.estado=this.estadoSeleccionado;
      this.searchEmit();
    }
    if(this.ubicacionSeleccionada){
   
      this.filters.ubicacion=this.ubicacionSeleccionada;
      this.searchEmit();
    }

  }
  
 searchEmit() {
    this.filterEvent.emit(this.filters);
  }

}
