<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'offers'
class offerDAO {
    // Método para obtener todas las ofertas desde la base de datos
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

    function get(){
        $connection = connection();
        $sql = "SELECT * FROM offer";
        $rersult = $connection->query($sql);
        $offers = $rersult->fetch_all(MYSQLI_ASSOC);
        $productOffers = [];
        foreach ($offers as $offer) {
            $offer["product"] = $this->getProductOffer($offer["offerId"])->data;
            $productOffers[] = $offer;
        }
        $query = new query(true, "Ofertas y productos obtenidos", $productOffers);
        return $query;
    }

    function addProductOffer($offerId, $productId){
        $sql = "INSERT INTO `productoffer`(`productId`, `offerId`) VALUES ('$productId','$offerId')";
        $connection = connection();
    }

    function getProductOffer($offerId){
        $connection = connection();
        $sql = "SELECT * FROM `productoffer`  WHERE `offerId` = '$offerId'";
        $result = $connection->query($sql);
        $productOffer = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Productos y ofertas obtenidas", $productOffer);
        return $query;
    }
}
?>