<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos y el modelo query
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'product'
class productsDAO
{
    // Método para obtener todos los productos desde la base de datos
    function getProductsModel()
    {
        $connection = connection();
        $sql = "SELECT * FROM producto";
        $rersult = $connection->query($sql);
        $productos = $rersult->fetch_all(MYSQLI_ASSOC);
        $query = new query(true,"Productos obtenidos",$productos);
        return $query;
    }

    // Función para agregar un producto a la base de datos
    function addProducts($precio, $descripcion, $imagen, $nombre, $color)
    {
        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        $rutaTemporal = $imagen['tmp_name'];
        $sql = "INSERT INTO producto(precio, descripcion, extension, nombre, color) VALUES ('$precio', '$descripcion', '$extension', '$nombre', '$color')";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "producto agregado correctamente", null);
            $idProducto = $connection->insert_id;
            move_uploaded_file($rutaTemporal, "../imgs/$idProducto.$extension");
        } catch (Exception $e) {
            $query = new query(false, "no se pudo agregar el producto", null);
        }

        return $query;
    }

    // Función para eliminar un producto
    function deleteProducts($id)
    {
        $sql = "DELETE FROM producto WHERE idProducto = '$id'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "producto eliminado", null);
        } catch (Exception $e) {
            $query = new query(false, "no se pudo eliminar el producto (id incorrecta)", null);
        }
        return $query;
    }

    // Función para modificar un producto
    function modifyProducts($id, $precio, $descripcion, $nombre, $color)
    {
        $sql = "UPDATE producto SET precio ='$precio', descripcion = '$descripcion', nombre ='$nombre', color ='$color' WHERE idProducto = '$id'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "producto modificado", null);
        } catch (Exception $e) {
            $query = new query(false, "no se pudo modificar el producto", null);
        }
        return $query;
    }

    // Función para obtener detalles de un producto específico
    function getProductDetails($id)
    {
        $connection = connection();
        $sql = "SELECT * FROM producto WHERE idProducto ='$id'";
        $result = $connection->query($sql);
        $productos = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "producto obtenido correctamente", $productos);

        return $query;
    }

    function setStock($idProducto, $stock){
        $sql = "UPDATE producto SET stock ='$stock' WHERE idProducto = '$idProducto'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Stock Agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el stock al producto", null);
        }
        return $query;
    }

    function updateStock($idProducto, $stock){
        $sql = "UPDATE producto SET stock = stock + '$stock' WHERE idProducto = '$idProducto'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Stock Agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el stock al producto", null);
        }
        return $query;
    }

    function getStock($idProducto){
        $connection = connection();
        $sql = "SELECT nombre, stock FROM producto WHERE idProducto = '$idProducto'";
        $rersult = $connection->query($sql);
        $producto = $rersult->fetch_all(MYSQLI_ASSOC);
        $query = new query(true,"Stock obtenido",$producto);
        return $query;
    }
}
?>