var timer = (function() {
	var seconds = 6; // ganger 10
	var secondsToStart = 0;
	
	function countdown(callback) {
		$(".fancybox-wrap.countdown-wrap").show();
		var countdownToStart = setInterval(function() {
			if(secondsToStart === 0) {
				clearInterval(countdownToStart);
				$(".countdown").hide();
				$("#fancybox-overlay").hide();
				callback();
			} else {
				$(".value").text(secondsToStart);
				$(".countdown").show();
				secondsToStart--;
			}
		}, 1000);
	}
	
	function start(callback) {
		var countdown = setInterval(function() {
			$("#secondsLeft").text(function() {
				if (seconds % 10 === 0) {
					return seconds / 10 + ",0";
				} else {
					return (seconds / 10 + "").replace(".", ",");
				}
			});

			if (seconds === 0) {
				clearInterval(countdown);
				callback();
			}
			seconds--;
		}, 100);
	}

	function finish() {
		$("#correct").text(game.getCorrect());
		$("#wrong").text(game.getWrong());
		$("#score").text(game.getScore());
		
		$("#fancybox-overlay").fadeIn(500, function() {
			$(".finish").css("display", "-webkit-box").delay(1000).fadeOut(300, function() {
				$(".fancybox-wrap.final-result-wrap").fadeIn(300);
				$("#participantName").focus();
			});
		});
	}
	
	return {
		start: start,
		finish: finish,
		countdown: countdown
	}
})();