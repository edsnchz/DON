<?php if ( ! defined('BASEPATH') ) exit('No direct script access allowed');

class Layout{

private $CI;

public $layout = 'plantilla';

public $js = '';

public $css = '';

public $title = 'Title por defecto';
public $keywords = 'palabras clave';
public $descripcion = 'descripción seo por defecto';

public function __construct($layout = 'plantilla'){
    $this->CI =& get_instance();
    $this->layout = $layout;
}

function setLayout($layout){
    $this->layout = $layout;
}
/**
* Retorna o renderea una vista
*
* @param string $view Nombre de la vista a procesar
* @param array $data Datos que se enviaran a la vista
* @param boolean $return Determina si una

* @return string Si se pasa $return en true,

*/
function view($view = null, $data = null, $return = false){
    $layout = "layout/{$this->layout}";
    $vista = (substr($view, 0, 1) == '/' ? $view : "{$this->CI->router->directory}/{$view}");
    $load_view = array(
        'content_for_layout' => $this->CI->load->view($vista, $data, true),
        'title' => $this->title,
        'js' => $this->js,
        'css'=> $this->css
    );
    if ( $return )
        return $this->CI->load->view($layout, $load_view, true);
    else
        $this->CI->load->view($layout, $load_view, false);
}
/**
* Retorna o renderea un elemento
*
* @param string $view Nombre de la vista a procesar
* @param array $data Datos que se enviaran a la vista
* @param boolean $return Determina si una

* @return string Si se pasa $return en true,

*/
public function element($view = null, $data = null, $return = false){
    $element = "elements/{$view}";
    $content_for_layout = $data;
    if ( $return )
        return $this->CI->load->view($element,
        compact('content_for_layout'), true);
    else
        $this->CI->load->view($element, compact('content_for_layout'),false);
}
    
public function setTitle($title){
    $this->title = $title;
}
    
public function setKeywords($keywords){
    $this->keywords = $keywords;
}
    
public function setDescripcion($descripcion){
    $this->descripcion = $descripcion;
}
    
public function getTitle(){
    return $this->title;
}

public function getKeywords(){
    return $this->keywords;
}

public function getDescripcion(){
    return $this->descripcion;
}
    

public function js($archivos = array()){
    foreach ( $archivos as $archivo )
    $this->js .= "<script type=\"text/javascript\"
    src=\"{$archivo}\"></script>\n";
}

public function css($archivos = array()){
    foreach ( $archivos as $archivo )
    $this->css .= "<link type=\"text/css\" rel=\"stylesheet\"
    href=\"{$archivo}\" />\n";
    }
}