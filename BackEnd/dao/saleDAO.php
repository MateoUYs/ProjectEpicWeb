<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../config/connection.php";
require_once __DIR__ . "/sesionDAO.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'sales'
class saleDAO
{
    // Método para agregar la compra desde la base de datos
    function add($shippingAddress, $paymentMethod, $shippingMethod, $saleDate, $products)
    {
        $session = (new SesionDAO())->getSession()->data;
        $userCi = $session['userCi'];
        $shippingAddress != null ? "'$shippingAddress'" : null;
        $isPaid = ($paymentMethod == "Tarjeta") ? 1 : 0;
        $saleStatus = ($shippingMethod == "Retiro") ? "En Espera en el local" : "En Espera de despachar el envío";

        $sql = "INSERT INTO `sales`(`isPaid`, `paymentMethod`, `shippingMethod`, `shippingAddress`,`saleStatus`, `userCi`, `saleDate`) VALUES ('$isPaid', '$paymentMethod', '$shippingMethod', $shippingAddress,'$saleStatus', '$userCi', '$saleDate')";
        $connection = connection();
        error_log(print_r($products,true));
        try {
            $connection->query($sql);
            $saleId = $connection->insert_id;
            foreach ($products as $product) {
                $this->addSaleProduct($saleId, $product);
            }
            $query = new query(true, "Venta agregada correctamente", null);
        } catch (Exception $e) {
            error_log($e);
            $query = new query(false, "No se pudo agregar la venta", null);
        }

        return $query;
    }

    function getAll()
    {
        $connection = connection();
        $sql = "SELECT * FROM `sales`";
        $rersult = $connection->query($sql);
        $sales = $rersult->fetch_all(MYSQLI_ASSOC);
        $productSales = [];
        foreach ($sales as $sale) {
            $sale["product"] = $this->getAllSaleProducts($sale["saleId"])->data;
            $productSales[] = $sale;
        }
        $query = new query(true, "Ventas y productos obtenidos", $productSales);
        return $query;
    }

    function getUserSales($userCi)
    {
        $connection = connection();
        $sql = "SELECT * FROM `sales` WHERE `userCi`='$userCi'";
        $rersult = $connection->query($sql);
        $sales = $rersult->fetch_all(MYSQLI_ASSOC);
        $productSales = [];
        foreach ($sales as $sale) {
            $sale["product"] = $this->getAllSaleProducts($sale["saleId"])->data;
            $productSales[] = $sale;
        }
        $query = new query(true, "Ventas y productos obtenidos", $productSales);
        return $query;
    }

    function getLastSales($yesterdayDate)
    {
        $connection = connection();
        $sql = "SELECT * FROM `sales` WHERE `saleDate`>='$yesterdayDate'";
        $rersult = $connection->query($sql);
        $sales = $rersult->fetch_all(MYSQLI_ASSOC);
        $productSales = [];
        foreach ($sales as $sale) {
            $sale["product"] = $this->getAllSaleProducts($sale["saleId"])->data;
            $productSales[] = $sale;
        }
        $query = new query(true, "Ultimas ventas y sus productos obtenidas", $productSales);
        return $query;
    }

    function updateStatus($saleId, $saleStatus)
    {
        $sql = "UPDATE `sales` SET `saleStatus`='$saleStatus' WHERE `saleId`='$saleId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Estado de venta actualizado correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo actualizar el estado de venta", null);
        }

        return $query;
    }

    function addSaleProduct($saleId, $product)
    {
        $discount = $product['discount'];
        $discount != null ? "'$discount'" : null;
        $productId = $product['productId'];
        $totalPrice = $product['price'] * $product['quantity'];
        $size = $product['size'];
        $quantity = $product['quantity'];

        $sql = "INSERT INTO `saleproduct`(`productId`, `saleId`, `quantity`, `totalPrice`, `size`, `discount`) VALUES ('$productId','$saleId','$quantity','$totalPrice','$size', $discount)";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Venta y producto agregado correctamente", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar la venta y el producto", null);
        }
        return $query;
    }

    function getAllSaleProducts($saleId)
    {
        $connection = connection();
        $sql = "SELECT * FROM `saleproduct`  WHERE `saleId`='$saleId'";
        $result = $connection->query($sql);
        $saleProducts = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Productos y ventas obtenidas", $saleProducts);
        return $query;
    }
}
?>