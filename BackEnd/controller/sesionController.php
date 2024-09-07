<?php header("Access-Control-Allow-Origin: *");


require_once __DIR__ . "/../dao/sesionDAO.php";



$funcion = isset($_GET['function']) ? $_GET['function'] : '';


switch ($funcion) {
    case 'logIn':
        //llama a la funcion iniciarSesion
        logIn();
        break;
    case 'getSession':
        //llama a la funcion  obtenerSesion
        getSession();
        break;
    case 'logOut':
        //llama a la funcion cerrarSesion
        logOut();
        break;
    default:

        echo json_encode(['error' => 'Función no reconocida']);
        break;
}

function logIn()
{
    $email = $_POST["email"];
    $password = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $result = (new SesionDAO)->logIn($email, $password);
    echo json_encode($result);
}

function getSession()
{
    $result = (new SesionDAO)->getSession();
    echo json_encode($result);
}

function logOut()
{
    $result = (new SesionDAO)->logOut();
    echo json_encode($result);
}

