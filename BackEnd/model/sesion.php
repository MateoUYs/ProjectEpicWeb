<?php

    class Sesion{
        public $ci;
        public $nombre;
        public $isAdmin;
        public function __construct($ci,$nombre,$isAdmin,) {
            $this->ci=$ci;
            $this->nombre=$nombre;
            $this->isAdmin=$isAdmin;
        }

        
    }

  


?>