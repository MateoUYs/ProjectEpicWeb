<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../config/connection.php";
require_once __DIR__ . '/sesionDAO.php';
require_once __DIR__ . "/query.php";

// Definición de la clase 'consults'
class inquirysDAO
{
    // Método para obtener todas las consultas desde la base de datos
    function get()
    {
        $connection = connection();
        $sql = "SELECT inquiry.*, users.userName FROM inquiry INNER JOIN users ON inquiry.userCi = users.userCi";
        $firstQuery = $connection->query($sql);
        $inquirys = $firstQuery->fetch_all(MYSQLI_ASSOC);
        $inquiryMessages = [];
        foreach ($inquirys as $inquiry) {
            $inquiry["message"] = $this->getMessage($inquiry["inquiryId"])->data;
            $inquiryMessages[] = $inquiry;
        }
        $query = new query(true, "Consultas y sus mensajes obtenidos con exito", $inquiryMessages);

        return $query;
    }

    function getNewInquirys(){
        $connection = connection();
        $sql = "SELECT inquiry.*, users.userName FROM inquiry INNER JOIN users ON inquiry.userCi = users.userCi WHERE inquiry.isAnswered = 0";
        $firstQuery = $connection->query($sql);
        $inquirys = $firstQuery->fetch_all(MYSQLI_ASSOC);
        $inquiryMessages = [];
        foreach ($inquirys as $inquiry) {
            $inquiry["message"] = $this->getMessage($inquiry["inquiryId"])->data;
            $inquiryMessages[] = $inquiry;
        }
        $query = new query(true, "Consultas y sus mensajes obtenidos con exito", $inquiryMessages);

        return $query;
    }

    function add($title, $messageContent)
    {
        $session = (new SesionDAO())->getSession()->data;
        $userCi = $session['userCi'];
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

    function answerInquiry($inquiryId, $messageContent)
    {
        $session = (new SesionDAO())->getSession()->data;
        $userCi = $session['userCi'];
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
        $inquiryMessages = [];
        foreach ($inquirys as $inquiry) {
            $inquiry["message"] = $this->getMessage($inquiry["inquiryId"])->data;
            $inquiryMessages[] = $inquiry;
        }
        $query = new query(true, "Consultas y sus mensajes obtenidos con exito", $inquiryMessages);


        return $query;
    }

    function getAnsweredInquirys()
    {
        $connection = connection();
        $sql = "SELECT * FROM `inquiry` WHERE `isAnswered`= 1";
        $result = $connection->query($sql);
        $inquirys = $result->fetch_all(MYSQLI_ASSOC);
        $inquiryMessages = [];
        foreach ($inquirys as $inquiry) {
            $inquiry["message"] = $this->getMessage($inquiry["inquiryId"])->data;
            $inquiryMessages[] = $inquiry;
        }
        $query = new query(true, "Consultas publicas obtenidas", $inquiryMessages);

        return $query;
    }


    function addMessage($content, $inquiryId, $userCi)
    {
        $sql = "INSERT INTO `message`(`content`, `inquiryId`, `userCI`) VALUES ('$content','$inquiryId', '$userCi')";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Mensaje agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el mensaje", null);
        }
        return $query;
    }

    function getMessage($inquiryId){
        $connection = connection();
        $sql = "SELECT * FROM `message` WHERE `inquiryId`='$inquiryId'";
        $firstQuery = $connection->query($sql);
        $messages = $firstQuery->fetch_all(MYSQLI_ASSOC);

        $query = new query(true, "Mensajes obtenidos con exito", $messages);

        return $query;
    }
}
?>