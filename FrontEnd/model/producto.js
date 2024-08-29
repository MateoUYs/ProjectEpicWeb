export default class Producto{
    precio;
    nombre;
    imagen;
    talle;
    descripcion;
    color;
    stock;
    id;

    constructor(precio,nombre,imagen,talle,descripcion,color,stock,id){
        this.precio=precio;
        this.nombre=nombre;
        this.imagen=imagen;
        this.talle=talle;
        this.descripcion=descripcion;
        this.color=color;
        this.stock=stock;
        this.id=id;
    }

}