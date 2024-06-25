<?php
require_once __DIR__ . "../controller/connection.php";

class statistics{
    function getStatisticsModel(){
        $connection = connection();
        $sql = "SELECT * FROM statistic";
        $result = $connection->query($sql);
        $users = $result-> fetch_all(MYSQLI_ASSOC);
        return $users;
    }
}

?>