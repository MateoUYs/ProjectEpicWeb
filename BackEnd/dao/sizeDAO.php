<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos y el modelo de query
require_once __DIR__ . "/../config/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'size'
class sizeDAO
{
    // Método para obtener todos los talles desde la base de datos
    function getSize()
    {
        $connection = connection();
        $sql = "SELECT * FROM `size`";
        $result = $connection->query($sql);
        $sizes = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Talles obtenidos", $sizes);

        return $query;
    }

    // Función para agregar un talle a la base de datos
    function addSize($type)
    {
        $sql = "INSERT INTO `size`(`type`) VALUES ('$type')";
        $connection = connection();
        try{
            $connection->query($sql);
            $query = new query(true, "Talle agregado correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el talle", null);
        }

        return $query;
    }

    // Función para eliminar un talle de la base de datos
    function deleteSize($type)
    {
        $sql = "DELETE FROM `size` WHERE `type` = '$type'";
        $connection = connection();
        try{
            $connection->query($sql);
            $query = new query(true, "Talle eliminado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar el talle (tipo incorrecto)", null);
        }
        return $query;
    }
}

?>