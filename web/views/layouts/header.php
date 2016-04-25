<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My first app</title>
	<!-- inject:head:css -->
	<!-- endinject -->
	<?php if(get_uri() == 'map'):?>
	<!-- inject:map:css -->
	<!-- endinject -->
	<?php endif; ?>
</head>
    
<body>
<?php
	require_once("navbar.php");
?>