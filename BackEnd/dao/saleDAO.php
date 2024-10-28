<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";

// Definición de la clase 'buys'
class saleDAO
{
    // Método para agregar la compra desde la base de datos
    function add($paymentMethod, $quantity, $userCi, $saleDate, $products, $size, $offerId)
    {
        if ($paymentMethod == "En Efectivo") {
            $sql = "INSERT INTO `sales`(`isPaid`, `paymentMethod`, `saleStatus`, `userCi`, `saleDate`) VALUES (0,'$paymentMethod','En Espera en el local','$userCi','$saleDate')";
            $connection = connection();
            try {
                $connection->query($sql);
                $saleId = $connection->insert_id;
                    foreach ($products as $product) {
                    $this->addSaleProduct($saleId, $product, $quantity, $size, $offerId);
                }
                
                $query = new query(true, "Oferta agregada correctamente", null);
            } catch (Exception $e) {
                $query = new query(false, "No se pudo agregar el producto", null);
            }
        }


        return $query;
    }

    function addSaleProduct($saleId, $product, $quantity, $size, $offerId)
    {
        $productId = $product['productId'];
        $totalPrice = $product['price'] * $quantity;
        $sql = "INSERT INTO `saleproduct`(`productId`, `saleId`, `quantity`, `totalPrice`, `size`, `offerId`) VALUES ('$productId','$saleId','[value-4]','[value-5]','[value-6]','[value-7]')";
        $connection = connection();
    }
}
?>