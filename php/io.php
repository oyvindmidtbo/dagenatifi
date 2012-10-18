<?php
	function getDBConnection() {
		include 'db.php';

		$connection = mysqli_connect($dbConfig['db_host'], $dbConfig['db_user'], $dbConfig['db_password']); 
		$success = mysqli_select_db($connection, $dbConfig['db_name']); 

		if (!$connection || !$success) {
			throw new Exception("ERROR when connecting to DB");
		}

		return $connection;
	}
?>