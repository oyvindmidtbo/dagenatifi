var io = (function() {
	function postHighScore(name, phone, mail) {
		$.post('php/io.php', {name: name, phone: phone, mail: mail}, function(data) {
			
		});
	}
}());