var score = (function() {
	function showHighScore(participants) {
		if (participants) {
			$("#highScoreList").html("<tr><th>Plass</th><th>Navn</th><th>Poeng</th></tr>");
					
			for (var i = 0; i < participants.length; i++) {
				$("#highScoreList").append("<tr><td>" + (i + 1) + "</td><td>" + participants[i].name + "</td><td>" + participants[i].points + "</td></tr>");
			}
		} else {
			$("#highScoreList").html("<tr><th>Ingen deltagere</th></tr>");
		}
	}

	function showWinner(participants) {
		if (participants) {
			$("#winner").html("<h1>Vinneren er:</h1>");
			$("#winner").append("Navn: " + participants[0].name);
			$("#winner").append("<br/>Telefon: " + participants[0].phone);
			$("#winner").append("<br/>E-postadresse: " + participants[0].mail);
			$("#winner").append("<br/>Poeng: " + participants[0].points);	
		} else {
			$("#winner").html("<h1>Ingen deltagere</h1>");
		}
		
	}

	return {
		showHighScore: showHighScore,
		showWinner: showWinner
	}
})();

$(function() {
	setInterval(function() {
		io.getHighScoreList(function(data) {
			score.showHighScore(data);
		});
	}, 2000);

	io.getHighScoreList(function(data) {
		score.showWinner(data);
	});
});