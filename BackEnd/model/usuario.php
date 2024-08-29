<?php

    class Usuario{
        public $ci;
        public $username;
        public $password;
        public $telefono;
        public $isverificada;
        public $email;
        public $is_admin;

        public function __construct($ci,$username,$password,$telefono,$isverificada,$email,$is_admin,) {
            $this->ci=$ci;
            $this->username=$username;
            $this->password=$password;
            $this->telefono=$telefono;
            $this->isverificada=$isverificada;
            $this->email=$email;
            $this->is_admin=$is_admin;
        }

        
    }

  


?>