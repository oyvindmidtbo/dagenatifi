var io = (function() {
	function postHighScore(name, phone, mail, points) {
		// $.post('php/io.php', {name: name, phone: phone, mail: mail, points: points}, function(data) {
		// 	console.log("data: " + data);	
		// });

		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {name: name, phone: phone, mail: mail, points: points},
			success: function(data) {
				console.log("grattis...");
			}
		});
	}

	return {
		postHighScore: postHighScore
	}
}());