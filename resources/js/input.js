DAGEN = {};

DAGEN.data = {
	originalText: "Lorem ipsum.",
	split: function() {
		return this.originalText.split("");
	},
	getValue: function(i) {
		var text = this.split()[i];
		if(text === " ") {
			return "&nbsp;"
		} else {
			return text;
		}
	}
}

DAGEN.game = {
	letter: 0,
	score: 0
}

$(function() {
	for(var i in DAGEN.data.split()) {
		var value = DAGEN.data.getValue(i);
		$(".content").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).bind("keypress", function(event) {
  		checkInputText(event);
	}); 	
});

var timer = {
	timeUsed: 0,
	start: function() {
		this.timeUsed = new Date().getTime();
	},
	finish: function() {
		var end = new Date().getTime();
		this.timeUsed = end - this.timeUsed;
	}
}

var finished = function(timer, score) {
	$("#timeUsed").text(timer.timeUsed);
	$("#score").text(score);
	$(".score").slideDown(1000);
}

var checkInputText = function(keyEvent) {
	if(DAGEN.game.letter === 0) {
		timer.start();
	}

	var span = $("#" + DAGEN.game.letter);
	var character = DAGEN.data.split()[DAGEN.game.letter];
	var keyPressed = String.fromCharCode(keyEvent.keyCode);

	if (keyPressed === character) {
		span.removeClass("wrong");
		span.addClass("correct");
		DAGEN.game.letter++;
		DAGEN.game.score++;
	} else {
		span.addClass("wrong");
	}

	if(DAGEN.game.letter == DAGEN.data.split().length) {
		timer.finish();
		finished(timer, DAGEN.game.score);
	}
}

