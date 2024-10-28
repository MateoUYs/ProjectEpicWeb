<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'buys'
class saleDAO
{
    // Método para agregar la compra desde la base de datos
    function add($paymentMethod, $quantity, $userCi, $saleDate, $products, $size, $offerId)
    {
        if ($paymentMethod == "En Efectivo" || $paymentMethod == "Transferencia") {
            $sql = "INSERT INTO `sales`(`isPaid`, `paymentMethod`, `saleStatus`, `userCi`, `saleDate`) VALUES (0,'$paymentMethod','En Espera en el local','$userCi','$saleDate')";
            $connection = connection();
            try {
                $connection->query($sql);
                $saleId = $connection->insert_id;
                foreach ($products as $product) {
                    $this->addSaleProduct($saleId, $product, $quantity, $size, $offerId);
                }

                $query = new query(true, "Venta agregada correctamente", null);
            } catch (Exception $e) {
                $query = new query(false, "No se pudo agregar la venta", null);
            }
        }else if($paymentMethod == "Por crédito/débito"){
            $sql = "INSERT INTO `sales`(`isPaid`, `paymentMethod`, `saleStatus`, `userCi`, `saleDate`) VALUES (1,'$paymentMethod','En Espera en el local','$userCi','$saleDate')";
            $connection = connection();
            try {
                $connection->query($sql);
                $saleId = $connection->insert_id;
                foreach ($products as $product) {
                    $this->addSaleProduct($saleId, $product, $quantity, $size, $offerId);
                }

                $query = new query(true, "Venta agregada correctamente", null);
            } catch (Exception $e) {
                $query = new query(false, "No se pudo agregar la venta", null);
            }
        }

        return $query;
    }

    function update(){

    }

    function addSaleProduct($saleId, $product, $quantity, $size, $offerId)
    {
        $productId = $product['productId'];
        $totalPrice = $product['price'] * $quantity;
        if (isset($offerId)) {
            $sql = "INSERT INTO `saleproduct`(`productId`, `saleId`, `quantity`, `totalPrice`, `size`, `offerId`) VALUES ('$productId','$saleId','$quantity','$totalPrice','$size','$offerId')";
            $connection = connection();
            try{
                $connection->query($sql);
                $query = new query(true, "Venta y producto agregado correctamente", null);
            }catch(Exception $e){
                $query = new query(false, "No se pudo agregar la venta y el producto", null);
            }
            return $query;
        }else{
            $sql = "INSERT INTO `saleproduct`(`productId`, `saleId`, `quantity`, `totalPrice`, `size`) VALUES ('$productId','$saleId','$quantity','$totalPrice','$size')";
            $connection = connection();
            try{
                $connection->query($sql);
                $query = new query(true, "Venta y producto agregado correctamente", null);
            }catch(Exception $e){
                $query = new query(false, "No se pudo agregar la venta y el producto", null);
            }

            return $query;
        }
    
    }
}
?>