<?php
require_once __DIR__ . "../controller/connection.php";

class offers{
    function getOffersModel(){
        $connection = connection();
        $sql = "SELECT * FROM offers";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>