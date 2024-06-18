<?php
function connection()
{
    try {
        //Se establecen atributos necesarios para realizar la conexión a la base de datos.
        $host = "localhost";
        $user = "root";
        $pass = "";
        $bd = "";
        $port = 3306;
        $mysqli = new mysqli($host, $user, $pass, $bd, $port);
        mysqli_report(MYSQLI_REPORT_OFF);
        return $mysqli;
    } catch (Exception $e) {
        echo 'Captured Exception: ', $e->getMessage();
    }
}

?>