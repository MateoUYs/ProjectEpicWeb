<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

ini_set('displayerrors', 0); // No mostrar errores en pantalla
ini_set('log_errors', 1);      // Registrar errores en el log
ini_set('error_log', __DIR__ .'/../error/error.log'); // Ruta del archivo de log


?>