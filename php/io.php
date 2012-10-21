<?php
	include 'connectionString.php';
	
	main();

	function getDatabaseConnection() {
		$connectionString = new ConnectionString();

		$connection = mysqli_connect($connectionString->getHost(), $connectionString->getUsername(), $connectionString->getPassword()); 
		$success = mysqli_select_db($connection, $connectionString->getDatabase()); 

		if (!$connection || !$success) {
			throw new Exception("Error when connecting to database");
		}

		return $connection;
	}

	function postScore($name, $phone, $mail, $points) {
		$connection = getDatabaseConnection();

		$name = mysqli_real_escape_string($connection, $name);
		$phone = mysqli_real_escape_string($connection, $phone);
		$mail = mysqli_real_escape_string($connection, $mail);
		$points = mysqli_real_escape_string($connection, $points);

		$query = "INSERT INTO participant (name, phone, mail, points) VALUES ('$name', '$phone', '$mail', '$points')";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}
	}

	function getHighScoreList() {
		$connection = getDatabaseConnection();

		$query = "SELECT name, phone, mail, points FROM participant ORDER BY points DESC LIMIT 0, 10";

		$result = mysqli_query($connection, $query);
		
		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}

		$rows = array();

		while ($row = mysqli_fetch_assoc($result)) {
			$rows['participants'][] = $row;
		}

		header("Content-type: application/json");
		print json_encode($rows);
	}

	function main() {
		if ($_POST['fn'] == "postScore") {
			postScore($_POST['name'], $_POST['phone'], $_POST['mail'], $_POST['points']);
		} else if ($_POST['fn'] == "getHighScoreList") {
			getHighScoreList();
		}
	}
?>