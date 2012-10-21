var timer = (function() {
	var seconds = 50; // ganger 10
	var secondsToStart = 3;
	
	function countdown(callback) {
		$(".fancybox-wrap.countdown-wrap").show();
		var countdownToStart = setInterval(function() {
			if(secondsToStart === 0) {
							clearInterval(countdownToStart);
							$(".countdown").hide();
							$("#fancybox-overlay").hide();
							start();
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
			$(".fancybox-wrap.final-result-wrap").show();
		});
	}
	
	return {
		start: start,
		finish: finish,
		countdown: countdown
	}
})();