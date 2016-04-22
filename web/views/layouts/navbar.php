<?
$menu=[
'Главная'=>'main',
'Карта'=>'map',
'Контакты'=>'contact'
];
?>
<nav class="navbar navbar-inverse navbar-fixed-top">
<div class="container">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Меню</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="/">Project name</a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
        	<?php 
		    	foreach($menu as $label => $url)
		    	{
		    		if(get_uri() == $url)echo '<li class="active">';
		    		else echo "<li>";
		    		echo '<a href ="'.$url.'">'.$label.'</a></li>';
		    	}
            ?>
        </ul>
    </div><!--/.nav-collapse -->
</div>
</nav>