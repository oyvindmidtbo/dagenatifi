var textToMatch = "Dette er teksten som skal matches.";
var correctCharacters = 0;

$(document).ready(function() {
	$("#normalText").text(textToMatch);
	$(document).keypress(function(event) {
  		checkInputText(event);
	}); 	
});

function checkInputText(keyEvent) {
	var keyPressed = String.fromCharCode(keyEvent.which);
	var character = textToMatch.substring(correctCharacters, correctCharacters + 1);
	if (keyPressed == character) {
		$("#greenText").text(function() {
			var textToGreen = $("#greenText").text() + character;
			return textToGreen;
		});

		$("#normalText").text(function() {
			var normalText = $("#normalText").text();
			var remainingNormalText = normalText.substring(1, normalText.length);
			return remainingNormalText;
		});

		correctCharacters++;
	}
	console.log("keypress: " + keyPressed);
}