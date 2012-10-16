var game = (function() {
	var letter = 0;
	var correct = 0;
	var wrong = 0;
	
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
	
	function start() {
		timer.countdown();
		$(document).keypress(function(event) {
	  		checkInputText(event);
		});
		
		$(".final-result-close").click(function() {
			$(".fancybox-wrap.final-result-wrap").hide(0, function() {
				$("#fancybox-overlay").fadeOut(500);
			});
		})
	}
	
	function checkInputText(keyEvent) {
		var span = getNextSpan();
		var character = getNextLetter();
		var keyPressed = String.fromCharCode(keyEvent.keyCode);

		if (keyPressed === character) {
			span.removeClass("wrong");
			span.addClass("correct");
			moveToNextLetter();
			addCorrect(1);
			if(keyEvent.keyCode === 32) {
				$(".text").animate({
					marginLeft: "-=110px"
				}, 800);
			}
			
		} else {
			span.addClass("wrong");
			addWrong(1);
		}
	}
	
	var timer = (function() {
		var seconds = 300; // ganger 10
		var secondsToStart = 3;
		
		function countdown() {
					$("#fancybox-overlay").fadeIn(500, function() {
						$(".fancybox-wrap.countdown-wrap").show();
					});
			var countdownToStart = setInterval(function() {
				if(secondsToStart === 0) {
					clearInterval(countdownToStart);
					$(".countdown").hide();
					$("#fancybox-overlay").hide();
					start();
				} else {
					$(".value").text(secondsToStart);
					$(".countdown").fadeIn(700).fadeOut(300);
					secondsToStart--;
				}
			}, 1000);
		}
		
		function start() {
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
					finish();
				}
				seconds--;
			}, 100);
		}

		function finish() {
			$("#correct").text(correct);
			$("#wrong").text(wrong);
			$("#score").text(getScore());
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
	
	
	var data = (function() {
		var textToMatch = "Dette er teksten som skal matches. Det ble stille og russeren viste hvordan den sorte ingeniøren fungerte. Plutselig så de tjueen hobitter som kom ved siden av kartongen. Boken kom og satt. En venn ristet ei løvinne bestemt. Soldaten lekte leiligheten rett ved en lysegrønn fiskebåt. En turist malte en osthøvel. Trompetene ankom, mens gullfiskene sang på turbinen. En figur malte en moped. En kjempehelt hørte datamaskinen til purkene.";
		var textArray = textToMatch.split("");
			
		function asArray() {
			return textArray;
		}
		
		function getValue(i) {
			var text = textArray[i];
			if(text === " ") {
				return "&nbsp;"
			} else {
				return text;
			}
		}
		
		function length() {
			return textArray.length;
		}
		
		return {
			asArray: asArray,
			getValue: getValue,
			length: length
		}
	})();
	
	return {
		data: data,
		start: start
	}
})();

$(function() {
	for(var i in game.data.asArray()) {
		var value = game.data.getValue(i);
		$(".text").append('<span id="' + i + '">' + value + '</span>');
	}

	// $(document).bind("keypress", function(event) {
 //  		game.checkInputText(event);
	// });
	
	game.start();
});
