<?php
	include 'connectionString.php';
	
	function getDatabaseConnection() {
		$connectionString = new ConnectionString();

		$connection = mysqli_connect($connectionString->getHost(), $connectionString->getUsername(), $connectionString->getPassword()); 
		$success = mysqli_select_db($connection, $connectionString->getDatabase()); 

		if (!$connection || !$success) {
			throw new Exception("Error when connecting to database");
		}

		return $connection;
	}

	function writeResultToDatabase($name, $phone, $mail, $points) {
		$connection = getDatabaseConnection();

		$name = $_POST['name'];
		$phone = $_POST['phone'];
		$mail = $_POST['mail'];
		$points = $_POST['points'];

		// $name = mysqli_real_escape_string($name);
		// $phone = mysqli_real_escape_string($phone);
		// $mail = mysqli_real_escape_string($mail);
		// $points = mysqli_real_escape_string($points);

		$query = "INSERT INTO participant (name, phone, mail, points) VALUES ('$name', '$phone', '$mail', '$points')";

		$result = mysqli_query($connection, $query);

		if (!$result) {
			throw new Exception("Error when doing SQL query");
		}

		return "Kommer helt ned hit";
	}

	function main() {
		if (isset($_POST['name'], $_POST['phone'], $_POST['mail'], $_POST['points'])) {
			
			echo "Noe?";
			return writeResultToDatabase($_POST['name'], $_POST['phone'], $_POST['mail'], $_POST['points']);
			
			// $result = array('id' => $slideshowId);
			// sendJSONResponse(json_encode($result));
		}
	}
?>