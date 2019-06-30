<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('load_styles'))
{
    function load_styles(){
        
        return '<link href="'.base_url().'assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
            <link href="'.base_url().'assets/fontawesome-free/css/all.min.css" rel="stylesheet">
            <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
            <link href="'.base_url().'assets/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css">
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet"
            type="text/css">
            <link href="'.base_url().'assets/toastr/toastr.css" rel="stylesheet" type="text/css">
            <link href="'.base_url().'assets/semantic/semantic.min.css" rel="stylesheet">
            <link href="'.base_url().'assets/owl/owl.carousel.min.css" rel="stylesheet">
            <link href="'.base_url().'assets/owl/owl.theme.default.min.css" rel="stylesheet">
            <link href="'.base_url().'css/app.css" rel="stylesheet">';
    }   


}

if (!function_exists('load_styles_url'))
{
    function load_styles_url($src){
        
        return '<link href="'.base_url().$src.'" rel="stylesheet">';
    }   
    
}