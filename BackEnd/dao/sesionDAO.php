<?php

session_start();
require_once __DIR__ . "/../controller/connection.php";
require_once __DIR__ . "/query.php";


class SesionDAO
{
    public $ci;
    public $nombre;


    public function logIn($email, $password)
    {
        $connection = connection();
        $sql = "SELECT * FROM `usuario` WHERE  email = '$email'";
        $answer = $connection->query($sql);
        $fila = $answer->fetch_assoc();
        if ($fila != null) {
            if (password_verify($password, $fila['password'])) {
                $_SESSION['sesion'] = ["ci" => $fila['ci'], "usuario" => $fila['username'], "email" => $fila['email'], "isAdmin" => $fila['isAdmin'] == 1 ? true : false, "isVerified" => $fila['isVerificada'] == 1 ? true : false, "phone" => $fila['telefono'], "pass" => $fila['password']];
                $query = new query(true, "sesion iniciada", $_SESSION['sesion']);     
            } else {
                $query = new query(false, "Contraseña incorrecta", null);
                $_SESSION['sesion'] = null;
            }
        } else {
            $query = new query(false, "Email incorrecto", null);
            $_SESSION['sesion'] = null;
        }

        return $query;
    }

    public function getSession()
    {

        if (isset($_SESSION['sesion'])) {
            $query = new query(true, "sesion obtenida ", $_SESSION['sesion']);
        } else {
            $query = new query(false, "no se encuentra una  sesion", null);
        }
        return $query;
    }

    public function logOut()
    {
        $_SESSION['sesion'] = null;
        $query = new query(true, "sesion cerrada", null);
        return $query;
    }

}



?>