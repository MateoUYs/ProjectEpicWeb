<?php
require_once __DIR__ . "../controller/connection.php";

class product{
    function getProductsModel(){
        $connection = connection();
        $sql = "SELECT * FROM products";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>