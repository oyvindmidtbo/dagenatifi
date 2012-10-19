var game = (function() {
	var letter = 0;
	var correct = 0;
	var wrong = 0;
	

	function start() {
		timer.countdown(function() {
			$(document).keypress(function(event) {
		  		checkInputText(event);
			});
			
			timer.start(function() {
				$(document).unbind("keypress");
				timer.finish();
			})
		});
	}
	
	function checkInputText(keyEvent) {
		var span = getNextSpan();
		var character = getNextLetter();
		var keyPressed = String.fromCharCode(keyEvent.which);

		if (keyPressed === character) {
			span.removeClass("wrong");
			span.addClass("correct");
			moveToNextLetter();
			addCorrect(1);
			//32 === spacebar
			if(keyEvent.which === 32) { 
				$(".text").animate({
					// console.log(span.position());
					marginLeft: "-=110px"
				}, 800);
			}
			
		} else {
			span.addClass("wrong");
			addWrong(1);
		}
	}

	function moveToNextLetter() {
		letter += 1;
	}

	function addCorrect(points) {
		correct += points;
		updateScore();
	}
	
	function addWrong(points) {
		wrong += points;
		updateScore();
	}
	
	function getCorrect() {
		return correct;
	}

	function getWrong() {
		return wrong;
	}
	
	function getScore() {
		return correct-wrong;
	}
	
	function updateScore() {
		$(".total-score").text(getScore());
	}
	
	function getNextLetter() {
		return data.asArray()[letter];
	}
	
	function getNextSpan() {
		return $("#" + letter);
	}
	
	function isFinished() {
		return letter === data.length();
	}
	
	function isFirstLetter() {
		return letter === 0;
	}
	
	return {
		start: start,
		getCorrect: getCorrect,
		getWrong: getWrong,
		getScore: getScore
	}
})();

$(function() {
	window.onbeforeunload = function(e) {
		e.preventDefault(); // prevent the user from leaving the page
	}
	for(var i in data.asArray()) {
		var value = data.getValue(i);
		$(".text").append('<span id="' + i + '">' + value + '</span>');
	}
	
	$(".start-button").click(function() {
		$(".fancybox-wrap.start-wrap").hide(0, function() {
			game.start();
		});
	})
	
	$(".final-result-close").click(function() {
		$(".fancybox-wrap.final-result-wrap").hide(0, function() {
			$("#fancybox-overlay").fadeOut(500);
			window.location.reload();
		});
	})
});
