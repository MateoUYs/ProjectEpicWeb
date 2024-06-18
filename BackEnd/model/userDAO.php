<?php
require_once __DIR__ . "../controller/connection.php";

class user{
    function getUsersModel(){
        $connection = connection();
        $sql = "SELECT * FROM user";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>