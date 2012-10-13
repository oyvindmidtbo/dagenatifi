var game = (function() {
	var letter = 0;
	var score = 0;
	var start, total = 0;
	
	var moveToNextLetter = function() {
		letter += 1;
	}

	var updateScore = function(points) {
		score += points;
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
			updateScore(1);
		} else {
			span.addClass("wrong");
		}

		if(isFinished()) {
			timer.finish();
		}
	}
	
	var timer = (function() {
		var start = function() {
			start = new Date().getTime();
		}

		var finish = function() {
			var end = new Date().getTime();
			total = end - start;
			$("#timeUsed").text(total);
			$("#score").text(score);
			$(".score").slideDown(1000);
		}
		
		return {
			start: start,
			finish: finish
		}
	})();
	
	
	var data = (function() {
		var textToMatch = "Lorem ipsum.";
		var textArray = textToMatch.split("");

		return {
			asArray: function() {
				return textArray;
			},
			getValue: function(i) {
				var text = textArray[i];
				if(text === " ") {
					return "&nbsp;"
				} else {
					return text;
				}
			},
			length: function() {
				return textArray.length;
			}
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
		$(".content").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).bind("keypress", function(event) {
  		game.checkInputText(event);
	}); 	
});
