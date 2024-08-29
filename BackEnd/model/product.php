<?php

    class Producto{
        public $precio;
        public $nombre;
        public $imagen;
        public $talle;
        public $descripcion;
        public $color;
        public $stock;
        public $id;

        public function __construct($precio,$nombre,$imagen,$talle,$descripcion,$color,$stock,$id) {
            $this->nombre=$nombre;
            $this->precio=$precio;
            $this->imagen=$imagen;
            $this->talle=$talle;
            $this->descripcion=$descripcion;
            $this->color=$color;
            $this->stock=$stock;
            $this->id=$id;
        }

        
    }

  


?>