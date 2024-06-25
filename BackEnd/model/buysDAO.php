<?php
require_once __DIR__ . "../controller/connection.php";

class buys{
    function getBuysModel(){
        $connection = connection();
        $sql = "SELECT * FROM buys";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>