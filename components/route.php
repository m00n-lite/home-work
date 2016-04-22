<?php
function get_uri(){
	$request = explode('/', trim($_SERVER['REQUEST_URI']),3); 
	$request = array_filter($request, "clean_uri");
	return $request[1];
}
function clean_uri($item){
	if($item)return true;
}
function construct_uri($route = null){
	return $route ? 'views/'.$route.'/'.$route.'.php' : 'views/404/404.php';
}
function render($route = null){
	$controller = construct_uri($route); 
	if(file_exists($controller))
	{
		require_once($controller);
	}
	else{
		$controller =construct_uri();
		require_once($controller);
	}
}
function content(){
	$route = get_uri();
	if(count($route))
	{ 
		render($route);	
	}
	else{
		render('main');
	}
		
}
?>