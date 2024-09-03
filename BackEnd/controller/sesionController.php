<?php

require_once __DIR__ . "/../dao/userDAO.php";



$funcion = isset($_GET['function']) ? $_GET['function'] : '';


switch ($funcion) {
    case 'iniciarSesion':

        iniciarSesion();
        break;
    case 'obtenerSesion':

        obtenerSesion();
        break;
    case 'cerrarSesion':

        cerrarSesion();
        break;
    default:

        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function iniciarSesion() {
    $email=$_POST["email"];
    $password=$_POST["password"];
}

function obtenerSesion() {

}

function cerrarSesion() {

}

