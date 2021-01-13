<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

// LOAD COMPOSER
require FCPATH . 'application/libraries/vendor/autoload.php';
// LOAD TWITTER
use Abraham\TwitterOAuth\TwitterOAuth;

class c_general extends CI_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('general');
        $this->load->model('utiles'); 
        $this->load->helper(array('load_styles', 'load_scripts', 'load_assets', 'url'));
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

    public function getAnunciosCarousel(){    
      $data = $this->general->db_get_anunciosCarousel($_POST["idCategoria"], $_POST["idDepartamento"]);
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

    public function getGraficoInversionByAnuncioAndFecha(){    
      $data = $this->general->db_get_GraficoInversionByAnuncioAndFecha($_POST["id"], $_POST["fecha1"], $_POST["fecha2"]);
      echo json_encode($data);  
    }

    public function getGraficoInversionTotalTipoByAnuncioAndFecha(){    
      $data = $this->general->db_get_GraficoInversionTotalTipoByAnuncioAndFecha($_POST["id"]);
      echo json_encode($data);  
    }

    public function getHistoricoComprasByAnuncioAndFecha(){    
      $data = $this->general->db_get_HistoricoComprasByAnuncioAndFecha($_POST["id"], $_POST["fecha1"], $_POST["fecha2"]);
      echo json_encode($data);  
    }

    public function getConsolidadoPromocionesByAnuncio(){    
      $data = $this->general->db_get_ConsolidadoTotalPromociones($_POST["id"]);
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

    public function getPromocionesByTipoAndDia(){   
      $data = $this->general->db_get_promocionesByTipoAndDia($_POST["idPaquete"], $_POST["dias"]);
      echo json_encode($data);  
    }

    public function getPromocionesRelojitoActivas(){   
      $data = $this->general->db_get_promociones_relojitoActivasByAnuncio($_POST["idAnuncio"]);
      echo json_encode($data);  
    }

    public function getPromocionTopFreeActiva(){   
      $data = $this->general->db_get_promociones_topFreeActivaByAnuncio($_POST["idAnuncio"]);
      echo json_encode($data);  
    }

    public function getPromocionesDiffDiasByAnuncioAndOpcion(){   
      $data = $this->general->db_get_promociones_diffDiasByAnuncioAndOpcion($_POST["idAnuncio"], $_POST["idOpcion"]);
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

    public function getGraficaVistasPorHoras(){    
      $data = $this->general->db_get_AuditoriaVistasPorHoras($_POST["idAnuncio"]);
      echo json_encode($data);  
    }

    public function getConceptosSoportes(){    
      $data = $this->general->db_get_conceptosSoportes();
      echo json_encode($data);  
    }

    public function saveFeedBack(){    
      $data = $this->general->db_save_feedback($this->session->userdata('idusuario'),$_POST["votacion"],$_POST["estrellas"],$_POST["mensaje"]);
      echo json_encode($data);  
    }

    public function saveTicketSupport(){    
      $data = $this->general->db_save_ticket_support($this->session->userdata('idusuario'),$_POST["idConcepto"],$_POST["mensaje"]);
      echo json_encode($data);  
    }

    public function validIdAnuncioByUser(){   
      $data = $this->general->db_valid_idAnuncioByUser($this->session->userdata('idusuario'), $_POST["idAnuncio"]);
      echo json_encode($data);  
    }

    public function insertPromocionAnuncio(){    
      $data = $this->general->db_insert_promocion_anuncio($_POST["idAnuncio"], $_POST["idOpcion"], $_POST["fechaHoraI"], $_POST["fechaHoraF"], $this->session->userdata('idusuario'));
      echo json_encode($data);  
    }

    public function insertPromocionAnuncioNow(){    
      $data = $this->general->db_insert_promocion_anuncio_now($_POST["idAnuncio"], $_POST["idOpcion"], $this->session->userdata('idusuario'));
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

    public function getDataCreditoByID(){		
      $data = $this->general->db_get_dataCreditosById($_POST["id"]);
      echo json_encode($data);	
    }

    public function getNextInvoice(){		
      $data = $this->general->db_get_NextInvoice();
      echo json_encode($data);	
    }

    public function confirmationPayment(){    
      
      if(!isset($_REQUEST["x_ref_payco"])){
          echo "INFORMACION INVALIDA";
          return false;
      }

      $dataParams = $this->general->db_get_paramsPayments();
      
      $data["ref_payco"] = $_REQUEST["x_ref_payco"];
      $data["idTransacion"] = $_REQUEST["x_transaction_id"];
      $data["idCredito"] = $_REQUEST["x_extra1"];
      $data["valor"] = $_REQUEST["x_amount_ok"];
      $data["currencyCode"] = $_REQUEST["x_currency_code"];
      $data["fechaTransaction"] = $_REQUEST["x_transaction_date"];
      $data["codeResultado"] = $_REQUEST["x_cod_transaction_state"];
      $data["resultado"] = $_REQUEST["x_transaction_state"];
      $data["text_resultado"] = $_REQUEST["x_response_reason_text"];
      $data["num_factura"] = $_REQUEST["x_id_invoice"];
      $data["idUsuario"] = $_REQUEST["x_extra2"];
      $data["signature"] = $_REQUEST["x_signature"];

      $signature = hash('sha256', $dataParams["data"][0]["userID"] . '^' . $dataParams["data"][0]["userKey"] . '^' . $data["ref_payco"] . '^' . $data["idTransacion"] . '^' . $data["valor"] . '^' . $data["currencyCode"]);

      if ($data["signature"] == $signature) {

          $rtn = $this->general->db_gestion_compras($data);
          echo json_encode($rtn); 

      }else{
          echo json_encode(array("resultado" => false));  
      }

    }

    public function responsePayment(){ 

      if(!isset($_GET["ref_payco"])){
          echo "INFORMACION INVALIDA";
          return false;
      }

      $response = file_get_contents('https://secure.epayco.co/validation/v1/reference/'.$_GET["ref_payco"]);
      $response = json_decode($response);
      $data = $response->data;
      
      $this->layout->setTitle("Respuesta Pago - doneroticos.com");
      $this->layout->js(Array(base_url()."js/views/respuestaPago.js"));
      $this->layout->css(Array("https://fonts.googleapis.com/css?family=Lobster&display=swap"));
      
      if(!isset($data->x_cod_transaction_state)){
         $this->pageResponseError();
         return false;
      }

      switch ((int) $data->x_cod_transaction_state) {
        case 1:
            $rtn = $this->general->db_insert_compra($data->x_ref_payco);
            if($rtn){
              $this->pageResponseSuccess();
            }
            break;
        case 2:
              $this->pageResponseError();
            break;
        case 3:
            $rtn = $this->general->db_insert_compra($data->x_ref_payco);
            if($rtn){
              $this->pageResponseSuccessEspera();
            }
            break;
        case 4:
              $this->pageResponseError();
            break;
        default:
              $this->pageResponseError();
      }


    }


    private function pageResponseSuccess(){
        $dataParams["msgTitulo"] = "Transacción <strong>Correcta</strong>";
        $dataParams["msgSubTitulo"] = "Una vez procesada recibirás una confirmación vía correo electrónico <br> y tus créditos se verán reflejados después de unos minutos.";
        $dataParams["icon"] = "<span class='oi oi-check classIconCheck'></span>";

        $dataParams["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true;  
        $this->layout->view("respuestaPago", $dataParams);
    }

    private function pageResponseSuccessEspera(){
        $dataParams["msgTitulo"] = "Transacción <strong>Pendiente</strong>";
        $dataParams["msgSubTitulo"] = "Una vez procesada recibirás una confirmación vía correo electrónico <br> y tus créditos se verán reflejados después de unos minutos.";
        $dataParams["icon"] = "<span class='oi oi-clock classIconCheck'></span>";

        $dataParams["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true;  
        $this->layout->view("respuestaPago", $dataParams);
    }

    private function pageResponseError(){
        $dataParams["msgTitulo"] = "Transacción <strong>Fallida</strong>";
        $dataParams["msgSubTitulo"] = "Verifique los datos ingresados e intente nuevamente";
        $dataParams["icon"] = "<span class='oi oi-x classIconX'></span>";

        $dataParams["loginBack"] = ($this->session->userdata('idusuario') == "")?false:true;  
        $this->layout->view("respuestaPago", $dataParams);
    }

    public function sendSMS(){
        // CREDENCIALES
        $url = "https://api.labsmobile.com/json/send";
        $key = base64_encode("contacto@edsonsanchezarq.com:M1PRuNFd92@2");

        $paramsBody = array(
          "message" => $_POST["code"] . " es tu codigo de verificacion doneroticos.",
          "recipient" => array("msisdn" => $_POST["number"])
        );

        $response = $this->utiles->consumeRest($url, $key, json_encode($paramsBody));
        
        echo json_encode($response);
    }

    public function postTwitter(){
        // CREDENCIALES
        $consumerKey = "cIUQMM3dP74LagkyRcnMjAfWv";
        $consumerSecret = "Vslob7tilURGoobkW5XYJFNRrNqKK1rpxoPg9KBztevGXwXuYf";
        $accessToken = "1286784082727272457-r54mqEH08Ja5fbWEnpUKVer0icAXSS";
        $accessTokenSecret = "59QcBOSFKyijpnHfAAfAm4u69Wlth8Ho8LjaWIAEUKFSA";

        $connection = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);
        
        $id = isset($_POST["id"])?$_POST["id"]:$_GET["id"];
        $data = $this->general->db_get_anuncioById($id)["data"];
        $titulo = "🔞💜 " . substr($data[0]["titulo"],0,140) . ".. 💜🔥" . " #doneroticos";
        $ubicacion = "🇨🇴 " . ($data[0]["ciudad"] . ", " . $data[0]["departamento"]);
        $etiquetas = $data["etiquetas"];
        $imagenes = $data["imagenes"];

        if(count($imagenes) == 0){
          return false;
        }

        $stringStatus = $titulo . "\n";
        $stringStatus .= $ubicacion . "\n";

        $limitEtiquetas = (count($etiquetas)>4)?4:count($etiquetas);
        for ($i=0; $i < ($limitEtiquetas); $i++) { 
            $stringStatus .= "#".str_replace(" ","", $etiquetas[$i]["nombre"]) . " ";
        }
        $stringStatus .= "\n\n";
        $stringStatus .= "Visita: https://doneroticos.com/anuncio?id=".$id;

        $mediasIDS = [];
        $limitImages = (count($imagenes)>3)?3:count($imagenes);
        for ($i=0; $i < ($limitImages); $i++) { 
            $media = $connection->upload('media/upload', ['media' => getcwd() . "/uploads/anuncios/" . $imagenes[$i]["url"]]);
            $mediasIDS[] = $media->media_id_string;
        }

        $parameters = [
            'status' => $stringStatus,
            'media_ids' => implode(',', $mediasIDS)
        ];
        $result = $connection->post('statuses/update', $parameters);

        print_r($result);
    }






}