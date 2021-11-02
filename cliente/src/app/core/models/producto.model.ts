import { Profile } from ".";

export class Producto {
  
    _id?: number;
    nombre: string;

    tipo: string;
    marca: string;
    modelo: string;
    estado: string;
    precio: Number;
    descripcion: string;
    imagen: string;
    ubicacion: string;
    fecha_alta: Date;
    author:Profile;
    slug?:string;
    favorited?: boolean;
    favorites?:number;
    favoritesCount?:number;




    constructor( _id:number,nombre: string , tipo: string, marca: string, modelo: string 
        , estado: string, precio: Number, descripcion: string, imagen: string
        , ubicacion: string, fecha_alta: Date, author:Profile, slug?:string, favorited?: boolean, favorites?:number,favoritesCount?:number){


        this.nombre = nombre;
        this.tipo = tipo; 
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.ubicacion = ubicacion;
        this.fecha_alta = fecha_alta;
        this.author= author;
        this.slug = slug;
        this.favorited = favorited ? favorited : false;
        this.favorites = favorites ? favorites : 0;
        this.favoritesCount = favoritesCount ? favoritesCount : 0;

    }
}