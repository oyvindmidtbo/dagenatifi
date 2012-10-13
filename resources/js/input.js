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

	var start = function() {
		start = new Date().getTime();
	}
	
	var finish = function() {
		var end = new Date().getTime();
		total = end - start;
		$("#timeUsed").text(total);
		$("#score").text(game.getScore());
		$(".score").slideDown(1000);
	}
	
	var checkInputText = function(keyEvent) {
		if(game.isFirstLetter()) {
			game.start();
		}

		var span = game.getNextSpan();
		var character = game.getNextLetter();
		var keyPressed = String.fromCharCode(keyEvent.keyCode);

		if (keyPressed === character) {
			span.removeClass("wrong");
			span.addClass("correct");
			game.moveToNextLetter();
			game.updateScore(1);
		} else {
			span.addClass("wrong");
		}

		if(game.isFinished()) {
			game.finish();
		}
	}
	
	
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
		getScore: function() {
			return score;
		},
		isFinished: function() {
			return letter === data.length();
		},
		isFirstLetter: function() {
			return letter === 0;
		},
		updateScore: updateScore,
		getNextLetter: getNextLetter,
		getNextSpan: getNextSpan,
		moveToNextLetter: moveToNextLetter,
		letter: letter,
		data: data,
		start: start,
		finish: finish,
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
