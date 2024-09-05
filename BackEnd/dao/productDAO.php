<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'product'
class productsDAO
{
    // Método para obtener todos los productos desde la base de datos
    function getProductsModel()
    {
        $connection = connection();
        $sql = "SELECT * FROM products";
        $answer = $connection->query($sql);
        $productos = $answer->fetch_all(MYSQLI_ASSOC);
        return $productos;
    }

    // Función para agregar un producto a la base de datos
    function addProducts($precio, $descripcion, $imagen, $nombre, $color)
    {
        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        $rutaTemporal = $imagen['tmp_name'];
        $sql = "INSERT INTO producto(precio, descripcion, extension, nombre, color) VALUES ('$precio', '$descripcion', '$extension', '$nombre', '$color')";
        $connection = connection();
        try {
            $result = $connection->query($sql);
            $answer = new answer(true, "producto agregado correctamente", null);
            $idProducto = $connection->insert_id;
            move_uploaded_file($rutaTemporal, "../imgs/$idProducto.$extension");
        } catch (Exception $e) {
            $answer = new answer(false, "no se pudo agregar el producto", null);
        }

        return $answer;
    }

    // Función para eliminar un producto
    function deleteProducts($id)
    {
        $sql = "DELETE FROM producto WHERE idProducto = '$id'";
        $connection = connection();
        try {
            $result = $connection->query($sql);
            $answer = new answer(true, "producto eliminado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "no se pudo eliminar el producto (id incorrecta)", null);
        }
        return $answer;
    }

    // Función para modificar un producto
    function modifyProducts($id, $precio, $descripcion, $nombre, $color)
    {
        $sql = "UPDATE producto SET precio ='$precio', descripcion = '$descripcion', nombre ='$nombre', color ='$color' WHERE idProducto = '$id'";
        $connection = connection();
        try {
            $result = $connection->query($sql);
            $answer = new answer(true, "producto modificado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "no se pudo modificar el producto", null);
        }
        return $answer;
    }

    // Función para obtener detalles de un producto específico
    function getProductDetails($id)
    {
        $connection = connection();
        $sql = "SELECT * FROM products WHERE idProducto ='$id'";
        $result = $connection->query($sql);
        $productos = $result->fetch_all(MYSQLI_ASSOC);
        $answer = new answer(true, "producto obtenido correctamente", $productos);

        return $answer;
    }
}
?>