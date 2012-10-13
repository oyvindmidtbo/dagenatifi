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

var timer = (function() {
	var start, total = 0;
	
	return {
		start: function() {
			start = new Date().getTime();
		},
		finish: function() {
			var end = new Date().getTime();
			total = end - start;
		},
		getTotal: function() {
			return total;
		}
	}
})();

var game = (function() {
	var letter = 0;
	var score = 0;
	
	var moveToNextLetter = function() {
		letter += 1;
	}
	
	var addToScore = function(points) {
		score = 15;
	}
	
	var getNextLetter = function() {
		return data.asArray()[letter];
	}
	
	var getNextSpan = function() {
		return $("#" + letter);
	}
	
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
		addToScore: addToScore,
		getNextLetter: getNextLetter,
		getNextSpan: getNextSpan,
		moveToNextLetter: moveToNextLetter,
		letter: letter
	}
	
})();

$(function() {
	for(var i in data.asArray()) {
		var value = data.getValue(i);
		$(".content").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).bind("keypress", function(event) {
  		checkInputText(event);
	}); 	
});

var finished = function(timer, score) {
	$("#timeUsed").text(timer.getTotal());
	$("#score").text(game.getScore());
	$(".score").slideDown(1000);
}

var checkInputText = function(keyEvent) {
	if(game.isFirstLetter()) {
		timer.start();
	}

	var span = game.getNextSpan();
	var character = game.getNextLetter();
	var keyPressed = String.fromCharCode(keyEvent.keyCode);

	if (keyPressed === character) {
		span.removeClass("wrong");
		span.addClass("correct");
		game.moveToNextLetter();
		game.addToScore(1);
	} else {
		span.addClass("wrong");
	}

	if(game.isFinished()) {
		timer.finish();
		finished(timer, game.score);
	}
}

