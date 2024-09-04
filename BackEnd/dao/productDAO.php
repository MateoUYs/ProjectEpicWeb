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

        $productos = $result->fetch_all(MYSQLI_ASSOC);

        return $productos;

    }

    function addProducts($precio, $descripcion, $imagen, $nombre, $color, $talle) {
        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        $rutaTemporal = $imagen['tmp_name'];
        $sql = "INSERT INTO producto(precio, descripcion, extension, nombre, color, talle) VALUES ('$precio', '$descripcion', '$imagen', '$nombre', '$color', '$talle')";
        $connection = connection();
        $respuesta = $connection->query($sql);
        $idProducto = $connection->insert_id;
        move_uploaded_file($rutaTemporal,"../imgs/$idProducto.$extension");
        return $respuesta;

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