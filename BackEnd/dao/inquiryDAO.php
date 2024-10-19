<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'consults'
class consults {
    // Método para obtener todas las consultas desde la base de datos
    function get() {
        $connection = connection();
        $sql = "SELECT * FROM `inquiry`";
        $result = $connection->query($sql);
        $inquirys = $result->fetch_all(MYSQLI_ASSOC);

        return $inquirys;
    }

    function add($title, $userCi, $messageContent){
        $sql = "INSERT INTO `inquiry`(`title`, `isPublic`, `userCi`) VALUES ('$title',0,'$userCi')";
        $connection = connection();
        try {
            $connection->query($sql);
            $inquiryId = $connection->insert_id;
            $this->addMessage($messageContent, $inquiryId, $userCi);
            $query = new query(true, "Consulta agregada", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar la consulta", null);
        }
        return $query;
    }


    function addMessage($content, $inquiryId, $userCi){
        $sql = "INSERT INTO `message`(`content`, `inquiryId`, `userCI`) VALUES ('$content','$inquiryId','$userCi')";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Mensaje agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el mensaje", null);
        }
        return $query;
    }
}
?>