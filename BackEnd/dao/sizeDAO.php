<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'product'
class sizeDAO
{
    // Método para obtener todos los talles desde la base de datos
    function getSize()
    {
        $connection = connection();
        $sql = "SELECT * FROM talle";
        $result = $connection->query($sql);
        $sizes = $result->fetch_all(MYSQLI_ASSOC);
        $answer = new answer(true, "talles obtenidos", $sizes);

        return $answer;
    }

    // Función para agregar un talle a la base de datos
    function addSize($tipo)
    {
        $sql = "INSERT INTO talle(tipo) VALUES ('$tipo')";
        $connection = connection();
        try{
            $result = $connection->query($sql);
            $answer = new answer(true, "Talle agregado correctamente", null);
        } catch (Exception $e) {
            $answer = new answer(false, "No se pudo agregar el talle", null);
        }

        return $answer;
    }

    // Función para eliminar un talle de la base de datos
    function deleteProducts($tipo)
    {
        $sql = "DELETE FROM talle WHERE tipo = '$tipo'";
        $connection = connection();
        $sqlAnswer = $connection->query($sql);
        try{
            $answer = new answer(true, "talle eliminado", null);
        } catch (Exception $e) {
            $answer = new answer(false, "no se pudo eliminar el talle (tipo incorrecto)", null);
        }
        return $answer;
    }
}

?>