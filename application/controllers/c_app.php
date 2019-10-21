<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class c_app extends CI_Controller {
	//CONSTRUCTOR
	function __construct(){
		parent::__construct();	
		$this->load->model('app');	
		$this->load->model('general');	
		$this->load->model('utiles');	
		$this->load->helper(array('load_styles', 'load_scripts', 'load_assets', 'url'));		
		$this->load->library(array('form_validation', 'session', 'encrypt', 'Layout'));
	}
	
	public function index()	{
		$this->layout->setTitle("Anuncios eróticos en Colombia - doneróticos.com");
		$this->layout->js(Array(base_url()."js/views/app.js"));
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 		
		$this->layout->view("app", $data);	
	}

	public function vstLogin(){
		$this->load->view('login');	
	}

	public function vstPageNotFound(){
		$this->load->view('pageNotFound');	
	}

	public function vstUsuario(){
		$this->layout->setTitle("Panel de Usuario - doneróticos.com");
		$this->layout->js(Array(
			base_url()."js/views/usuario.js",
			"https://code.jquery.com/ui/1.12.1/jquery-ui.js",
			"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js",
			"https://checkout.epayco.co/checkout.js",
			"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.js",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js",
			base_url().'assets/quill-editor/quill.js',
			base_url().'assets/quill-editor/config-quill.js',
		));
		$this->layout->css(Array(
			base_url()."css/uploadImages.css",
			"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css",
			base_url().'assets/quill-editor/quill-snow.css',
		));
		$data["tab"] = (isset($_GET["tab"]))?$_GET["tab"]:null;
		$data["apiKey"] = $this->general->db_get_paramsPayments()["data"][0]["apiKey"];
		$data["usuXt"] = $this->session->userdata('idusuario');
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 	
		$this->layout->view("usuario", $data);			
	}

	public function vstListaAnuncios(){
		$this->layout->setTitle("DON - ANUNCIOS");
		$this->layout->js(Array(
			base_url()."js/views/listaAnuncios.js",
			base_url()."js/gridAnuncios.js",
			base_url()."assets/bricklayer/bricklayer.js"
		));
		$this->layout->css(Array(
			base_url()."css/gridAnuncios.css",
			base_url()."assets/bricklayer/bricklayer.css"
		));

		$dataParams["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 	
		$dataParams["categ"] = $_GET["categ"];
		$dataParams["etiq"] = $_GET["etiq"];
		$dataParams["state"] = $_GET["state"];
		$dataParams["city"] = $_GET["city"];
		$dataParams["text"] = $_GET["text"];
		$this->layout->view("listaAnuncios", $dataParams);			
	}

	public function vstDetalleAnuncio(){
		$this->layout->setTitle("DON - ANUNCIO");
		$this->layout->js(Array(
			base_url()."js/views/detalleAnuncio.js",
			"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"
		));
		$this->layout->css(Array(
			"https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.css",
			base_url().'assets/quill-editor/quill-snow.css',
		));

		$boolean = $this->general->db_validIfExist_anuncio($_GET["idAnuncio"]);
		if(!$boolean["result"]){
			$this->load->view('pageNotFound');	
			return false;
		}

		// AUDITORIA 
		$this->general->db_aud_anuncios($_GET["idAnuncio"], "VISTA");

		$dataParams["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 	
		$dataParams["id"] = $_GET["idAnuncio"];
		$this->layout->view("detalleAnuncio", $dataParams);			
	}

	public function vstCondicionesUso()	{
		$this->layout->setTitle("Condiciones Uso - doneróticos.com");
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 		
		$this->layout->view("condicionesUso", $data);	
	}

	public function vstPoliticaPagos()	{
		$this->layout->setTitle("Politica Pagos - doneróticos.com");
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 		
		$this->layout->view("politicaPagos", $data);	
	}

	public function vstPoliticaPrivacidad()	{
		$this->layout->setTitle("Politica Privacidad - doneróticos.com");
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 		
		$this->layout->view("politicaPrivacidad", $data);	
	}

	public function vstContactanos()	{
		$this->layout->setTitle("Contactanos - doneróticos.com");
		$data["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true; 		
		$this->layout->view("contactanos", $data);	
	}

	public function login(){		
		$data = $this->app->db_get_usuario($_POST["correo"], $_POST["pass"]);
		if(count($data) == 0){
			echo json_encode( array("resultado" => false, "message" => "Verifique el nombre de usuario y contraseña"));
		}else{
			$row = $data[0];
			$datasession = array('idusuario'  => $row["id"],
								  'correo' => $row["correo"] ,								  
								  'pass'=>  $row["pass"]);
			$this->session->set_userdata($datasession);
			echo json_encode(array("resultado"=>true, "message" => "Bienvenido"));	
		}	
	}

	public function logout(){
		$datasession = array(
				'idusuario'  => null,			 
				'correo' =>null,	
				'pass' => null);	
		$this->session->unset_userdata($datasession);
		echo json_encode(array("resultado" => true, "message" => "Sesion cerrada satisfactoriamente"));			
	}	

	public function insertUsuario(){		
		$data = $this->app->db_insert_usuario($_POST["correo"], $_POST["pass"], $_POST["token"]);
		echo json_encode($data);	
	}

	public function setNewPass(){		
		$data = $this->app->db_setNewPass_usuario($_POST["correo"], $_POST["pass"]);
		echo json_encode($data);	
	}

	public function validEmail(){
		$data = $this->app->db_valid_tokenEmail($_GET["idxt"]);
		if($data["resultado"] == true){
			$this->load->view('login');		
		}else{
			echo $data["message"];
		}	
	}	

	public function insertAuditoria(){		
		$this->general->db_aud_anuncios($_POST["idAnuncio"], $_POST["tipo"]);	
	}

	public function loadImages(){
		// CONFIG LIBRARY UPLOADS
		$configU['upload_path'] = "uploads/anuncios/";
		$configU['file_name'] = "anuncio_".$_POST["idAnuncio"]."_usuario_".$this->session->userdata('idusuario');
		$configU['allowed_types'] = "gif|jpg|jpeg|png";
		$configU['max_size'] = "50000";
		// $configU['max_width'] = "2000";
    	// $configU['max_height'] = "2000";
		$this->load->library('upload', $configU);   
		
		// CONFIG LIBRARY WATERMARKS
		$configW['image_library'] = 'gd2';
		$configW['wm_type'] = 'overlay';
		$configW['wm_overlay_path'] = 'images/watermark.png';
		$configW['wm_opacity'] = '50';
		$configW['wm_vrt_alignment'] = 'middle';
		$configW['wm_hor_alignment'] = 'center';
		$configW['maintain_ratio'] = TRUE;

		$this->load->library('image_lib', $configW);
		
		$numFiles = json_decode($_POST['numFiles']);

		foreach ($numFiles as $clave => $i){
			// GUARDO LA IMAGEN
			if($this->upload->do_upload('file-'.$i)){
				
				// CREA LA MARCA DE AGUA
				$image_data = $this->upload->data();
				//print_r($image_data);
				$configW['source_image'] = $image_data['full_path'];
				$configW['width'] = 500;
				// if($image_data['image_height']>=500){
					$configW['height'] = ($image_data['image_height']/2);
				//}
				$this->image_lib->initialize($configW);
				$this->image_lib->resize();
				if (!$this->image_lib->watermark()) {
					echo json_encode(Array("resultado" => false, "mensaje" => "Error al crear marcas de agua"));	
					return;
				}	

				$this->general->db_set_imagenes($_POST["idAnuncio"], $this->upload->data("file_name")["file_name"]);
			}else{
				echo json_encode(Array("resultado" => false, "mensaje" => "Error al subir las imagenes"));	
				return;
			}

		}


		$this->image_lib->clear();
		unset($configU);
		unset($configW);
		echo json_encode(Array("resultado" => true, "mensaje" => "Imagenes subidas satisfactoriamente"));	
		return;
	}


	

}