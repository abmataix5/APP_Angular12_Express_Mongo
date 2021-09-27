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
    slug?:string;


    constructor( _id:number,nombre: string , tipo: string, marca: string, modelo: string 
        , estado: string, precio: Number, descripcion: string, imagen: string
        , ubicacion: string, fecha_alta: Date,slug?:string){
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
        this.slug = slug;
    }
}