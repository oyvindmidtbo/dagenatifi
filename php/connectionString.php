<?php
	class ConnectionString {
   		private $host = '';
   		private $username = '';
   		private $password = '';
   		private $database = '';

    	public function getHost() {
			if (parse_url($_SERVER['HTTP_HOST'], 1) != 'localhost') {
				return $this->host;
			} else {
				return 'localhost';
			}
    	}

    	public function getUsername() {
			if (parse_url($_SERVER['HTTP_HOST'], 1) != 'localhost') {
				return $this->username;
			} else {
				return 'root';
			}
    	}

    	public function getPassword() {
			if (parse_url($_SERVER['HTTP_HOST'], 1) != 'localhost') {
        		return $this->password;
			} else {
				return 'root';
			}
    	}

		public function getDatabase() {
        	if (parse_url($_SERVER['HTTP_HOST'], 1) != 'localhost') {
        		return $this->database;
			} else {
				return 'dagen';
			}
    	}
	}
?>