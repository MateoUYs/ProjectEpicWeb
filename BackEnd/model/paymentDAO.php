<?php
require_once __DIR__ . "../controller/connection.php";

class payment{
    function getPaymentModel(){
        $connection = connection();
        $sql = "SELECT * FROM payment";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>