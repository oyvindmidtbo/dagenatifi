var data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
var score = 0;
var text = data.split("");
var i = 0;
var start;

var finished = function(timeUsed, score) {
	$("#timeUsed").text(timeUsed);
	$("#score").text(score);
	$(".score").slideDown(1000);
}


var checkInputText = function(keyEvent) {
	if(i === 0) {
		start = new Date().getTime();
	}

	var span = $("#" + i);
	var character = span.text();
	var keyPressed = String.fromCharCode(keyEvent.keyCode);
	
	if (keyPressed === character) {
		span.addClass("correct");
		score++;
	} else {
		span.addClass("wrong");
	}

	i++;
	if(i == text.length) {
		var end = new Date().getTime();
		var timeUsed = end - start;
		finished(timeUsed, score);
	}
}

$(function() {
	for(var i in text) {
		var value = text[i];
		$(".content").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).bind("keypress", function(event) {
  		checkInputText(event);
	}); 	
});

