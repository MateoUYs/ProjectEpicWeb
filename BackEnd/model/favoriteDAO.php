<?php
require_once __DIR__ . "../controller/connection.php";

class favorites{
    function getFavoritesModel(){
        $connection = connection();
        $sql = "SELECT * FROM favorites";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>