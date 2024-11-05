<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../config/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'offers'
class offerDAO
{
    // Método para obtener todas las ofertas desde la base de datos
    function add($title, $description, $endDate, $startDate, $discount, $products)
    {
        error_log(print_r($products, true));
        $sql = "INSERT INTO `offer`(`title`, `description`, `endDate`, `startDate`, `discount`) VALUES ('$title','$description','$endDate','$startDate','$discount')";
        $connection = connection();
        try {
            $connection->query($sql);
            $offerId = $connection->insert_id;
            foreach ($products as $product) {
                $this->addProductOffer($offerId, $product);
            }
            $query = new query(true, "Oferta agregada correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar la oferta", null);
        }

        return $query;
    }

    function get()
    {
        $connection = connection();
        $sql = "SELECT * FROM offer";
        $result = $connection->query($sql);
        $offers = $result->fetch_all(MYSQLI_ASSOC);
        $productOffers = [];
        foreach ($offers as $offer) {
            $offer["product"] = $this->getProductOffer($offer["offerId"])->data;
            $productOffers[] = $offer;
        }
        $query = new query(true, "Ofertas y productos obtenidos", $productOffers);
        return $query;
    }

    function delete($offerId)
    {
        $sql = "DELETE FROM `offer` WHERE `offerId` = '$offerId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $this->deleteProductOffer($offerId);
            $query = new query(true, "Oferta eliminada correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar la oferta", null);
        }

        return $query;
    }

    function modify($offerId, $title, $description, $endDate, $startDate, $discount, $products)
    {
        $sql = "UPDATE `offer` SET `title`='$title',`description`='$description',`endDate`='$endDate',`startDate`='$startDate',`discount`='$discount' WHERE `offerId`='$offerId' ";
        $connection = connection();
        try {
            $connection->query($sql);
            $this->deleteProductOffer($offerId);
            foreach ($products as $product) {
                $this->addProductOffer($offerId, $product);
            }
            $query = new query(true, "Oferta modificada", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo modificar la oferta", null);
        }
        return $query;
    }

    function addProductOffer($offerId, $productId)
    {
        $sql = "INSERT INTO `productoffer`(`productId`, `offerId`) VALUES ('$productId','$offerId')";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Oferta y producto agregado correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el producto y la oferta", null);
        }

        return $query;
    }

    function getProductOffer($offerId)
    {
        $connection = connection();
        $sql = "SELECT * FROM `productoffer`  WHERE `offerId` = '$offerId'";
        $result = $connection->query($sql);
        $productOffer = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Productos y ofertas obtenidas", $productOffer);
        return $query;
    }

    function deleteProductOffer($offerId)
    {
        $sql = "DELETE FROM `productoffer` WHERE `offerId` = '$offerId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Oferta y productos eliminados correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar las ofertas y los productos", null);
        }

        return $query;
    }


}
?>