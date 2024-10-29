<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'favorites'
class favoritesDAO {
    // Método para obtener todos los favoritos desde la base de datos
    function getUserFavorites($userCi) {
        $connection = connection();
        $sql = "SELECT * FROM `userfavoriteproduct` WHERE `userCi`='$userCi'";
        $query = $connection->query($sql);
        $favorites = $query->fetch_all(MYSQLI_ASSOC);
        return $favorites;
    }

    function addUserFavorites($userCi, $productsIds){
        foreach($productsIds as $productId){
            $sql = "INSERT INTO `userfavoriteproduct`(`userCi`, `productId`) VALUES ('$userCi','$productId')";
            $connection = connection();
            try{
                $connection->query($sql);
                $query = new query(true, "Producto agregado como favorito correctamente", null);
            }catch(Exception $e){
                $query = new query(false, "No se pudo agregar el producto como favorito", null);
            }
        }
        return $query;
    }

    function deleteUserFavorite($userCi, $productId){
        $sql = "DELETE FROM `userfavoriteproduct` WHERE `userCi`='$userCi' AND `productId`='$productId'";
        $connection = connection();
        try{
            $connection->query($sql);
            $query = new query(true, "Producto eliminado como favorito correctamente", null);
        }catch(Exception $e){
            $query = new query(false, "No se pudo eliminar el producto como favorito", null);
        }
        return $query;
    }
}
?>