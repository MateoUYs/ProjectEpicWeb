<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'product'
class productsDAO {
    // Método para obtener todos los productos desde la base de datos
    function getProductsModel() {
        // Se obtiene la conexión a la base de datos
        $connection = connection();
        
        // Se define la consulta SQL para obtener todas las filas de la tabla 'products'
        $sql = "SELECT * FROM products";
        
        // Se ejecuta la consulta y se almacena el resultado
        $result = $connection->query($sql);
        
        // Se obtienen todas las filas del resultado en un arreglo asociativo
        $productos =[];

        while($fila = $result->fetch_assoc()){
            $productos[] = new Producto($fila['precio'],$fila['nombre'],$fila['imagen'],$fila['talle'],$fila['descripcion'],$fila['color'],$fila['stock'],$fila['id']);
        }
        $products = $result->fetch_all(MYSQLI_ASSOC);
        return new Respuesta(true,"",$products);
        


        
        // Se retorna el arreglo de productos
       // return $products;
    }

    function addProducts() {
        // Implementación pendiente
    }
    
    // Función para eliminar un producto
    function deleteProducts() {
        // Implementación pendiente
    }
    
    // Función para modificar un producto
    function modifyProducts() {
        // Implementación pendiente
    }
    
    // Función para obtener detalles de un producto específico
    function obtenerDetalleProducto() {
        // Implementación pendiente
    }
}
?>