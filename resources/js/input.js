var game = (function() {
	var letter = 0;
	var score = 0;
	var correct = 0;
	var wrong = 0;
	
	var moveToNextLetter = function() {
		letter += 1;
	}

	var addCorrect = function(points) {
		correct += points;
	}
	
	var addWrong = function(points) {
		wrong += points;
	}
	
	var getNextLetter = function() {
		return data.asArray()[letter];
	}
	
	var getNextSpan = function() {
		return $("#" + letter);
	}
	
	var isFinished = function() {
		return letter === data.length();
	}
	
	var isFirstLetter = function() {
		return letter === 0;
	}
	
	var checkInputText = function(keyEvent) {
		if(isFirstLetter()) {
			timer.start();
		}

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
					marginLeft: "-=200px"
				}, 800);
			}
			
		} else {
			span.addClass("wrong");
			addWrong(1);
		}
	}
	
	var timer = (function() {
		var seconds = 300; // ganger 10
			
		var start = function() {
			var countdown = setInterval(function() {
				$("#secondsLeft").text(function() {
					if (seconds % 10 === 0) {
						return seconds / 10 + ",0";
					} else {
						return (seconds / 10 + "").replace(".", ",");
					}
				});

				if (seconds === 0) {
					gameOver = true;
					clearInterval(countdown);
					finish();
				}
				seconds--;
			}, 100);
		}

		var finish = function() {
			score = correct - wrong;
			$("#correct").text(correct);
			$("#wrong").text(wrong);
			$("#score").text(score);
			$(".score").slideDown(1000);
		}
		
		return {
			start: start,
			finish: finish
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
		checkInputText: checkInputText
	}
})();

$(function() {
	for(var i in game.data.asArray()) {
		var value = game.data.getValue(i);
		$(".text").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).bind("keypress", function(event) {
  		game.checkInputText(event);
	}); 	
});
