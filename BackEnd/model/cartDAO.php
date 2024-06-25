<?php
require_once __DIR__ . "../controller/connection.php";

class carts{
    function getCartsModel(){
        $connection = connection();
        $sql = "SELECT * FROM carts";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>