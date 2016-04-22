<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My first app</title>
    <link href="/assets/css/main.css" rel="stylesheet">
    <?php if(get_uri() == 'map'):?>
	<link href="/assets/css/map.css" rel="stylesheet">
	<?php endif; ?>
</head>
<body>
<?php
	require_once("navbar.php");
?>