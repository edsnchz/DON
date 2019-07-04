<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class c_general extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('general');
        $this->load->library(array('session', 'encrypt', 'Layout'));
    }

    public function getCategorias(){		
      $data = $this->general->db_get_categorias();
      echo json_encode($data);	
      }
    
    public function getEtiquetasByCategoria(){		
      $data = $this->general->db_get_etiquetasByCategoria($_POST["idCategoria"]);
      echo json_encode($data);	
    }

    public function getEtiquetas(){		
      $data = $this->general->db_get_etiquetas();
      echo json_encode($data);	
    }

    public function getDepartamentos(){		
      $data = $this->general->db_get_departamentos();
      echo json_encode($data);	
    }

    public function getCiudadesByDepartamento(){		
      $data = $this->general->db_get_ciudadesByDepartamento($_POST["idDepartamento"]);
      echo json_encode($data);	
    }

    public function getCelularesByUser(){		
      $data = $this->general->db_get_celularesByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function addNumber(){		
      $data = $this->general->db_add_number($_POST["number"], $this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function deleteNumber(){		
      $data = $this->general->db_delete_number($_POST["id"]);
      echo json_encode($data);	
    }

    public function getTiemposServicios(){		
      $data = $this->general->db_get_tiemposServicios();
      echo json_encode($data);	
    }

    public function getRelacionesServicios(){		
      $data = $this->general->db_get_relacionesServicios();
      echo json_encode($data);	
    }

    public function addAnuncio(){		
      $data = $this->general->db_add_anuncio($_POST["data"], $this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function getAnunciosVistaCuadricula(){		
      $data = $this->general->db_get_anunciosVistaCuadricula($_POST["idCategoria"], $_POST["idDepartamento"], $_POST["idCiudad"], $_POST["idEtiqueta"]);
      echo json_encode($data);	
    }

    
}