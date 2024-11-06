<?php

require_once __DIR__ . '/../config/connection.php';
require_once __DIR__ . '/query.php';


class statsDAO
{

    function getBestSellings(){
        $connection = connection();
        $sql = "SELECT * FROM productSalesQuantity LIMIT 10";
        $queryResponse = $connection->query($sql);
        $bestSellings = $queryResponse->fetch_all(MYSQLI_ASSOC);

        $query = new query(true, "Productos mas vendidos obtenidos con exito", $bestSellings);
        return $query;
    }

    function getLeastSold(){
        $connection = connection();
        $sql = "SELECT * FROM productSalesQuantity ORDER BY saleQuantity ASC LIMIT 10";
        $queryResponse = $connection->query($sql);
        $leastSold = $queryResponse->fetch_all(MYSQLI_ASSOC);

        $query = new query(true, "Productos menos vendidos obtenidos con exito", $leastSold);
        return $query;
    }

    function getMostSaved(){
        $connection = connection();
        $sql = "SELECT * FROM savedproducts LIMIT 10";
        $queryResponse = $connection->query($sql);
        $mostSaved = $queryResponse->fetch_all(MYSQLI_ASSOC);

        $query = new query(true, "Productos mas guardados como favoritos obtenidos con exito", $mostSaved);
        return $query;
    }
}
