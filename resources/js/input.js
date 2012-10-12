var textToMatch = "Dette er teksten som skal matches.";
var correctCharacters = 0;
var redText = false;

$(document).ready(function() {
	$("#normalText").text(textToMatch);
	$(document).keypress(function(event) {
  		checkInputText(event);
  		updatePoints();
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

		if (redText) {
			$("#redText").text("");
			redText = false;
		} else {
			$("#normalText").text(function() {
				var normalText = $("#normalText").text();
				var remainingNormalText = normalText.substring(1, normalText.length);
				return remainingNormalText;
			});	
		}
		

		correctCharacters++;
	} else {
		if (!redText) {
			$("#redText").text(function() {
				var normalText = $("#normalText").text();
				var textToRed = normalText.substring(0, 1);
				return textToRed;
			});

			$("#normalText").text(function() {
				var normalText = $("#normalText").text();
				var remainingNormalText = normalText.substring(1, normalText.length);
				return remainingNormalText;
			});
			
			redText = true;
		} else {

		}
	}
	console.log("keyPressed: " + keyPressed);
}

function updatePoints() {
	$("#numberOfPoints").text(correctCharacters);
}