<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";

// Definición de la clase 'favorites'
class favoritesDAO {
    // Método para obtener todos los favoritos desde la base de datos
    function get() {
        $connection = connection();
        $sql = "SELECT * FROM favorites";
        $query = $connection->query($sql);
        $favorites = $query->fetch_all(MYSQLI_ASSOC);
        return $favorites;
    }
}
?>