<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos y el modelo de query
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'size'
class sizeDAO
{
    // Método para obtener todos los talles desde la base de datos
    function getSize()
    {
        $connection = connection();
        $sql = "SELECT * FROM talle";
        $result = $connection->query($sql);
        $sizes = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "talles obtenidos", $sizes);

        return $query;
    }

    // Función para agregar un talle a la base de datos
    function addSize($tipo)
    {
        $sql = "INSERT INTO talle(tipo) VALUES ('$tipo')";
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
    function deleteSize($tipo)
    {
        $sql = "DELETE FROM talle WHERE tipo = '$tipo'";
        $connection = connection();
        try{
            $connection->query($sql);
            $query = new query(true, "talle eliminado", null);
        } catch (Exception $e) {
            $query = new query(false, "no se pudo eliminar el talle (tipo incorrecto)", null);
        }
        return $query;
    }
}

?>