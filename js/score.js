var score = (function() {
	function showHighScore(participants) {
		for (var i = 0; i < participants.length; i++) {
			$("#highScoreList").append("<tr><td>" + (i + 1) + "</td><td>" + participants[i].name + "</td><td>" + participants[i].points + "</td></tr>");
		}
	}

	return {
		showHighScore: showHighScore
	}
})();

$(function() {
	io.getHighScoreList(function(data) {
		score.showHighScore(data);
	});
});