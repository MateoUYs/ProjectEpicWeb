<?php
require_once __DIR__ . "../controller/connection.php";

class consults{
    function getConsultsModel(){
        $connection = connection();
        $sql = "SELECT * FROM consults";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>