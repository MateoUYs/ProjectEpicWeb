<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'buys'
class saleDAO {
    // Método para obtener todas las compras desde la base de datos
    function add($title, $description, $endDate, $startDate, $discount, $products) {
        $sql = "INSERT INTO `offer`(`title`, `description`, `endDate`, `startDate`, `discount`) VALUES ('$title','$description','$endDate','$startDate','$discount')";
        $connection = connection();
        try {
            $connection->query($sql);
            $offerId = $connection->insert_id;
            foreach($products as $product){
                $this->addProductOffer($offerId, $product);
            }
            $query = new query(true, "Oferta agregada correctamente", null); 
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el producto", null);
        }

        return $query;
    }

    function addProductOffer($offerId, $productId){
        $sql = "INSERT INTO `productoffer`(`productId`, `offerId`) VALUES ('$productId','$offerId')";
        $connection = connection();
    }
}
?>