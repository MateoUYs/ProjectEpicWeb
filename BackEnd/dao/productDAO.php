<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos y el modelo query
require_once __DIR__ . "/../config/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'product'
class productsDAO
{
    // Método para obtener todos los productos desde la base de datos
    function getProducts()
    {
        $connection = connection();
        $sql = "SELECT * FROM product";
        $result = $connection->query($sql);
        $productos = $result->fetch_all(MYSQLI_ASSOC);
        $productosSize = [];
        foreach ($productos as $producto) {
            $producto["size"] = $this->getProductSize($producto["productId"])->data;
            $productosSize[] = $producto;
        }
        error_log(print_r($productos, true));
        $query = new query(true, "Productos obtenidos", $productosSize);
        return $query;
    }


    // Función para agregar un producto a la base de datos
    function addProducts($price, $description, $image, $name, $color, $sizes)
    {
        error_log('Datos: ' . print_r($sizes, true));
        $extension = pathinfo($image['name'], PATHINFO_EXTENSION);
        $rutaTemporal = $image['tmp_name'];
        $sql = "INSERT INTO `product`(`price`, `description`, `extension`, `name`, `color`) VALUES ('$price', '$description', '$extension', '$name', '$color')";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Producto agregado correctamente", null);
            $productId = $connection->insert_id;
            move_uploaded_file($rutaTemporal, "../imgs/$productId.$extension");
            foreach ($sizes as $size) {
                $this->setProductSize($size, $productId);
            }
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el producto", null);
        }

        return $query;
    }

    // Función para eliminar un producto
    function deleteProducts($productId)
    {
        $sql = "DELETE FROM `product` WHERE `productId` = '$productId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Producto eliminado", null);
            $this->deleteProductSize($productId);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar el producto (id incorrecta)", null);
        }
        return $query;
    }

    // Función para modificar un producto
    function modifyProducts($productId, $price, $description, $image, $name, $color, $sizes, $oldSizes)
    {
        if (isset($image) && $image["error"] === 0) {
            $extension = pathinfo($image['name'], PATHINFO_EXTENSION);
            $rutaTemporal = $image['tmp_name'];
            $sql = "UPDATE `product` SET `price` ='$price', `description` = '$description', `extension` = '$extension', `name` ='$name', `color` ='$color' WHERE `productId` = '$productId'";
            $connection = connection();
            try {
                $connection->query($sql);
                foreach ($sizes as $size) {
                    if ($oldSizes != "") {
                        foreach ($oldSizes as $oldSize) {
                            if ($size == $oldSizes) {
                                $this->updateProductSize($size, $productId, $oldSize);
                            }
                        }
                    }else{
                        $this->setProductSize($size, $productId);
                    }

                }
                $query = new query(true, "Producto modificado", null);
                move_uploaded_file($rutaTemporal, "../imgs/$productId.$extension");
            } catch (Exception $e) {
                $query = new query(false, "No se pudo modificar el producto", null);
            }
            return $query;
        } else {
            $sql = "UPDATE `product` SET `price` ='$price', `description` = '$description', `name` ='$name', `color` ='$color' WHERE `productId` = '$productId'";
            $connection = connection();
            try {
                $connection->query($sql);
                foreach ($sizes as $size) {
                    if ($oldSizes != "") {
                        foreach ($oldSizes as $oldSize) {
                            if ($size == $oldSizes) {
                                $this->updateProductSize($size, $productId, $oldSize);
                            }
                        }
                    }else{
                        $this->setProductSize($size, $productId);
                    }
                }
                $query = new query(true, "Producto modificado", null);
            } catch (Exception $e) {
                $query = new query(false, "No se pudo modificar el producto", null);
            }
            return $query;
        }

    }

    // Función para obtener detalles de un producto específico
    function getProductDetails($productId)
    {
        $connection = connection();
        $sql = "SELECT * FROM `product` WHERE `productId` = '$productId'";
        $result = $connection->query($sql);
        $productos = $result->fetch_assoc();
        $query = new query(true, "Producto obtenido correctamente", $productos);

        return $query;
    }

    function addStock($productId, $stock)
    {
        $sql = "UPDATE `product` SET `stock` = `stock` + '$stock' WHERE `productId` = '$productId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Stock Agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el stock al producto", null);
        }
        return $query;
    }

    function updateStock($productId, $stock)
    {
        $sql = "UPDATE `product` SET `stock` ='$stock' WHERE `productId` = '$productId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Stock Agregado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo agregar el stock al producto", null);
        }
        return $query;
    }

    function getStock()
    {
        $connection = connection();
        $sql = "SELECT `productId`, `name`, `stock` FROM `product`";
        $result = $connection->query($sql);
        $producto = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Stock obtenido", $producto);
        return $query;
    }

    function setProductSize($size, $productId)
    {
        $connection = connection();
        $sql = "INSERT INTO `productsize`(`productId`, `sizeType`) VALUES ('$productId', '$size')";
        try {
            $connection->query($sql);
            $query = new query(true, "Talle Añadido al producto", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo añadir el talle al producto", null);
        }
        return $query;
    }

    function updateProductSize($size, $productId, $oldSize)
    {
        $connection = connection();
        $sql = "UPDATE `productsize` SET `sizeType` ='$size' WHERE `productId` = '$productId' AND `sizeType` = '$oldSize'";
        try {
            $connection->query($sql);
            $query = new query(true, "Talle del producto modificado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo modificar el talle al producto", null);
        }
        return $query;
    }

    function getProductSize($productId)
    {
        $connection = connection();
        $sql = "SELECT `sizeType` FROM `productsize`  WHERE `productId` = '$productId'";
        $result = $connection->query($sql);
        $size = $result->fetch_all(MYSQLI_ASSOC);
        $query = new query(true, "Talle del producto obtenido", $size);
        return $query;
    }

    function deleteProductSize($productId)
    {
        $sql = "DELETE FROM `productsize` WHERE `productId` = '$productId'";
        $connection = connection();
        try {
            $connection->query($sql);
            $query = new query(true, "Talle del producto eliminado", null);
        } catch (Exception $e) {
            $query = new query(false, "No se pudo eliminar el  talle del producto (id incorrecta)", null);
        }
        return $query;
    }

}
?>