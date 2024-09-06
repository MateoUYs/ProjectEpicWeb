<?php header("Access-Control-Allow-Origin: *");


require_once __DIR__ . "/../dao/sesionDAO.php";



$funcion = isset($_GET['function']) ? $_GET['function'] : '';


switch ($funcion) {
    case 'iniciarSesion':
//llama a la funcion iniciarSesion
        iniciarSesion();
        break;
    case 'obtenerSesion':
//llama a la funcion  obtenerSesion
        obtenerSesion();
        break;
    case 'cerrarSesion':
//llama a la funcion cerrarSesion
        cerrarSesion();
        break;
    default:

        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function iniciarSesion() {
    $email= $_POST["email"];
    $password  = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $Respuesta = (new SesionDAO)->iniciarSesion($email, $hashedPassword);
    echo json_encode($Respuesta);
}

function obtenerSesion() {
    $Respuesta = (new SesionDAO)->obtenerSesion();
    echo json_encode($Respuesta);
}

function cerrarSesion() {
    $Respuesta = (new SesionDAO)->cerrarSession();
    echo json_encode($Respuesta);
}

