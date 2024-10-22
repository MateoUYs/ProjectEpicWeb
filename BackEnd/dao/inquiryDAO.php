<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'consults'
class consults
{
    // Método para obtener todas las consultas desde la base de datos
    function get()
    {
        $connection = connection();
        $sql = "SELECT * FROM `inquiry`";
        $result = $connection->query($sql);
        $inquirys = $result->fetch_all(MYSQLI_ASSOC);

        return $inquirys;
    }

    function add($title, $userCi, $messageContent)
    {
        $sql = "INSERT INTO `inquiry`(`title`, `isPublic`, `isAnswered`, `userCi`) VALUES ('$title',0,0,'$userCi')";
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

    function answerInquiry($inquiryId, $messageContent, $userCi)
    {
        $sql = "UPDATE `inquiry` SET `isAnswered`= 1 WHERE `inquiryId`='$inquiryId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $this->addMessage($messageContent, $inquiryId, $userCi);
            $query = new query(true, "Consulta respondida", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo responder la consulta", null);
        }
        return $query;

    }


    function submitInquiry($inquiryId)
    {
        $sql = "UPDATE `inquiry` SET `isPublic`= 1 WHERE `inquiryId`='$inquiryId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Consulta publicada", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo publicar la consulta", null);
        }
        return $query;
    }

    function getPublicInquirys()
    {
        $connection = connection();
        $sql = "SELECT * FROM `inquiry` WHERE `isPublic`= 1";
        $result = $connection->query($sql);
        $inquirys = $result->fetch_all(MYSQLI_ASSOC);

        return $inquirys;
    }

    function getAnsweredInquirys()
    {
        $connection = connection();
        $sql = "SELECT * FROM `inquiry` WHERE `isAnswered`= 1";
        $result = $connection->query($sql);
        $inquirys = $result->fetch_all(MYSQLI_ASSOC);

        return $inquirys;
    }


    function addMessage($content, $inquiryId, $userCi)
    {
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