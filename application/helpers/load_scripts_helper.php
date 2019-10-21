<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('load_scripts'))
{
    function load_scripts(){
        
        return '<script src="'.base_url().'js/jquery/jquery.min.js"></script>
                <script src="'.base_url().'assets/semantic/semantic.min.js"></script>
                <script src="'.base_url().'assets/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
                <script src="'.base_url().'assets/toastr/toastr.js"></script>
                <script src="'.base_url().'assets/owl/owl.carousel.min.js"></script>
                <script src="'.base_url().'assets/owl/jquery.mousewheel.js"></script>
                <script src="'.base_url().'assets/cryptojs/cryptojs.js"></script>
                <script src="'.base_url().'js/utils.js"></script>';
    }   

}

if (!function_exists('load_scripts_url'))
{
    function load_scripts_url($src){
        
        return '<script src="'.base_url().$src.'"></script>';
    }   
    
}