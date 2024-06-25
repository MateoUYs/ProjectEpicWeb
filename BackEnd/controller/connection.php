<?php
function connection()
{
    try {
        // Se establecen los parámetros necesarios para realizar la conexión a la base de datos.
        $host = "localhost"; // Dirección del servidor de la base de datos
        $user = "root";      // Nombre de usuario para la conexión
        $pass = "";          // Contraseña para la conexión
        $bd = "topStyleShop"; // Nombre de la base de datos
        $port = 3306;        // Puerto de conexión (predeterminado para MySQL)

        // Se crea una nueva instancia de mysqli para establecer la conexión
        $mysqli = new mysqli($host, $user, $pass, $bd, $port);

        // Desactiva el reporte automático de errores de mysqli
        mysqli_report(MYSQLI_REPORT_OFF);

        // Devuelve el objeto de conexión
        return $mysqli;
    } catch (Exception $e) {
        // Captura y muestra cualquier excepción que ocurra durante la conexión
        echo 'Captured Exception: ', $e->getMessage();
    }
}
?>