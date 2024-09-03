<?php

    class Respuesta{
        public $estado;
        public $mensaje;
        public $dato;

        function __construct($estado,$mensaje,$dato)
        {
            $this->estado=$estado;
            $this->mensaje=$mensaje;
            $this->dato=$dato;
        }
    }

?>