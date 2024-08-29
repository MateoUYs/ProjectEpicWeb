<?php

    session_start();

    class SesionDAO{
        public $ci;
        public $nombre;

        public function iniciarSesion($ci , $password){
            //completar verfificar datos 
            //obtener datos del usuario 

            $sesion = new Sesion($ci,$nombre,$isAdmin);
            $_SESSION['sesion'] = $sesion;

        }

        public function obtenerSesion(){
            return $_SESSION['sesion'];
        }

        public function cerrarSession(){
            $_SESSION['sesion'] = null;
        }

        public function estaLogeado(){
            return isset($_SESSION['sesion']);
        }
    }



?>