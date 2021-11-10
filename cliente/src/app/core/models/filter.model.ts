export class Filter {
    stateFilter?:boolean;
    search?:string;
    limit?:number;
    offset?:number;
    categoria?: string;
    precioMin?: Number;
    precioMax?: Number;
    estado?: string;
    ubicacion?: string;
    author?: string;
    favorited?: string;
    followed?: string;



    constructor( 
        stateFilter?:boolean,
        search?:string,
        limit?:number,
        offset?:number,
        categoria?:string,
        estado?: string, 
        precioMin?: Number, 
        precioMax?: Number, 
        ubicacion?: string,
        author?:string,
        favorited?:string,
        followed?:string){

        this.stateFilter;
        this.search=search;
        this.limit=limit;
        this.offset=offset;
        this.categoria = categoria;
        this.precioMin = precioMin;
        this.precioMax = precioMax;
        this.estado = estado;
        this.ubicacion = ubicacion;
        this.author = author;
        this.favorited = favorited;
        this.followed=followed;
    }
}