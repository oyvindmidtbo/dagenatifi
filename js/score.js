var score = (function() {
	function showHighScore(participants) {
		if (participants) {
			$("#highScoreList").html("<tr><th>Plass</th><th>Navn</th><th>Poeng</th></tr>");
					
			for (var i = 0; i < participants.length; i++) {
				$("#highScoreList").append("<tr><td>" + (i + 1) + "</td><td>" + participants[i].name + "</td><td>" + participants[i].points + "</td></tr>");
			}

			console.log("Vinneren: " + participants[0].name);
			console.log("Telefon: " + participants[0].phone);
			console.log("E-postadresse: " + participants[0].mail);
			console.log("Poeng: " + participants[0].mail);
			console.log("******************************");
		} else {
			$("#highScoreList").html("<tr><th>Ingen deltagere</th></tr>");
		}

		
	}

	return {
		showHighScore: showHighScore
	}
})();

$(function() {
	setInterval(function() {
		io.getHighScoreList(function(data) {
			score.showHighScore(data);
		});		
	}, 2000);
});