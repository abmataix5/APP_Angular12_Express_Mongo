export class Categoria {
    _id?: number;
    nombre_catego: string;
    descripcion: string;
    slug?: string;



    constructor( _id:number,nombre_catego: string,estado: string, descripcion: string,slug?:string){
   
        this.nombre_catego = nombre_catego;
        this.descripcion = descripcion;
        this.slug = slug;

    }
}