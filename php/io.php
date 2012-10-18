<?php
	include("connectionString.php");

	$connectionString = new ConnectionString();

	$connection = mysqli_connect($connectionString->getHost(), $connectionString->getUsername(), $connectionString->getPassword()); 
	$success = mysqli_select_db($connection, $connectionString->getDatabase()); 

	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$mail = $_POST['mail'];
	$points = $_POST['points'];

	$query = "INSERT INTO participant (name, phone, mail, points) VALUES ('$name', '$phone', '$mail', '$points')";

	$result = mysqli_query($connection, $query);

	if ($result) {
		echo "SUCCESS";
	} else {
		echo "NOSUCCESS";
	}
?>