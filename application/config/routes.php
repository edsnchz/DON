<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

$route['anuncios'] = "c_app/anuncios";
$route['anuncio'] = "c_app/anuncio";
$route['login'] = "c_app/login";
$route['usuario'] = "c_app/usuario";
$route['condiciones'] = "c_app/condiciones";
$route['politica_pagos'] = "c_app/politica_pagos";
$route['politica_privacidad'] = "c_app/politica_privacidad";
$route['contactanos'] = "c_app/contactanos";
$route['confirmationPayment'] = "c_general/confirmationPayment";
$route['responsePayment'] = "c_general/responsePayment";


$route['default_controller'] = "c_app";
$route['404_override'] = 'config_404';


/* End of file routes.php */
/* Location: ./application/config/routes.php */