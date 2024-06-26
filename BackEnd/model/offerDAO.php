<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'offers'
class offers {
    // Método para obtener todas las ofertas desde la base de datos
    function getOffersModel() {
        // Se obtiene la conexión a la base de datos
        $connection = connection();
        
        // Se define la consulta SQL para obtener todas las filas de la tabla 'offers'
        $sql = "SELECT * FROM offers";
        
        // Se ejecuta la consulta y se almacena el resultado
        $result = $connection->query($sql);
        
        // Se obtienen todas las filas del resultado en un arreglo asociativo
        $offers = $result->fetch_all(MYSQLI_ASSOC);
        
        // Se retorna el arreglo de ofertas
        return $offers;
    }
}
?>