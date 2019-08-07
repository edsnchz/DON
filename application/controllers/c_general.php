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

    public function editAnuncio(){		
      $data = $this->general->db_edit_anuncio($_POST["data"], $this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function getAnuncios(){		
      $data = $this->general->db_get_anuncios($_POST["idCategoria"], $_POST["idDepartamento"], $_POST["idCiudad"], $_POST["idEtiqueta"], $_POST["text"]);
      echo json_encode($data);	
    }

    public function getAnuncioById(){		
      $data = $this->general->db_get_anuncioById($_POST["id"]);
      echo json_encode($data);	
    }

    public function getAuditoriaByAnuncio(){		
      $data = $this->general->db_get_AuditoriaByAnuncio($_POST["id"]);
      echo json_encode($data);	
    }

    public function getAuditoriaGraficoByAnuncio(){		
      $data = $this->general->db_get_AuditoriaGraficoByAnuncio($_POST["id"]);
      echo json_encode($data);	
    }

    public function getAuditoriaGraficoByAnuncioAndFecha(){		
      $data = $this->general->db_get_AuditoriaGraficoByAnuncioAndFecha($_POST["id"], $_POST["fecha1"], $_POST["fecha2"]);
      echo json_encode($data);	
    }

    public function getAuditoriaGraficoTipoVistaByAnuncioAndFecha(){		
      $data = $this->general->db_get_AuditoriaGraficoTipoVistaByAnuncioAndFecha($_POST["id"], $_POST["fecha1"], $_POST["fecha2"]);
      echo json_encode($data);	
    }

    public function sendPrivateMessage(){		
      $data = $this->general->db_send_menssage($_POST["idAnuncio"], $_POST["correo"], $_POST["mensaje"]);
      echo json_encode($data);	
    }
    
    public function getUsuariosMensajes(){		
      $data = $this->general->db_get_UsuariosMensajesByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function getMensajesByUser(){		
      $data = $this->general->db_get_MensajesByUser($this->session->userdata('idusuario'), $_POST["correo"]);
      echo json_encode($data);	
    }

    public function getAlarmaMensajesByUser(){		
      $data = $this->general->db_get_AlarmMensajesByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function setUltimaVistaMensajes(){		
      $data = $this->general->db_set_ultimaVistaMensaje($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function getConceptosDenuncias(){		
      $data = $this->general->db_get_conceptosDenuncias();
      echo json_encode($data);	
    }

    public function addDenuncia(){		
      $data = $this->general->db_add_denuncia($_POST["idAnuncio"], $_POST["concepto"], $_POST["texto"]);
      echo json_encode($data);	
    }

    public function getPreciosCreditos(){		
      $data = $this->general->db_get_preciosCreditos();
      echo json_encode($data);	
    }

    public function getCreditosByUser(){		
      $data = $this->general->db_get_creditosByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function getFotosByUser(){		
      $data = $this->general->db_get_fotosByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function setImagenesAnuncioLocal(){		
      $data = $this->general->db_set_imagenesLocal($_POST["data"], $_POST["idAnuncio"]);
      echo json_encode($data);	
    }

    public function getAnunciosByUser(){		
      $data = $this->general->db_get_anunciosByUser($this->session->userdata('idusuario'));
      echo json_encode($data);	
    }

    public function deleteAnuncio(){		
      $data = $this->general->db_delete_anuncio($_POST["idAnuncio"]);
      echo json_encode($data);	
    }

    public function getFechasAnuncioById(){		
      $data = $this->general->db_get_FechasAnuncioById($_POST["idAnuncio"]);
      echo json_encode($data);	
    }


}
