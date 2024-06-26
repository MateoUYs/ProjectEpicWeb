<?php
// Se incluye el archivo que contiene la función de conexión a la base de datos
require_once __DIR__ . "../controller/connection.php";

// Definición de la clase 'payment'
class payment {
    // Método para obtener todos los métodos de pago desde la base de datos
    function getPaymentModel() {
        // Se obtiene la conexión a la base de datos
        $connection = connection();
        
        // Se define la consulta SQL para obtener todas las filas de la tabla 'payment'
        $sql = "SELECT * FROM payment";
        
        // Se ejecuta la consulta y se almacena el resultado
        $result = $connection->query($sql);
        
        // Se obtienen todas las filas del resultado en un arreglo asociativo
        $payment = $result->fetch_all(MYSQLI_ASSOC);
        
        // Se retorna el arreglo de métodos de pago
        return $payment;
    }
}
?>
