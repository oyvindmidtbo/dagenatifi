var io = (function() {
	function postScore(name, phone, mail, points, successCallback, errorCallback) {
		$.ajax({
			type: "POST",
			url: "php/io.php",
			cache: false,
			data:  {fn: "postScore", name: name, phone: phone, mail: mail, points: points},
			success: function(data) {
				successCallback(data);
			},
			error: function(data) {
				errorCallback(data);
			}
		});
	}

	function getHighScoreList(callback) {
		$.ajax({
			type: "GET",
			url: "php/io.php",
			cache: false,
			data:  {fn: "getHighScoreList"},
			success: function(data) {
				callback(data.participants);
			}
		});
	}

	return {
		postScore: postScore,
		getHighScoreList: getHighScoreList
	}
}());