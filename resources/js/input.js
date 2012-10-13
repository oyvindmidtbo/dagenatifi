var textToMatch = "Dette er teksten som skal matches.";
var correctCharacters = 0;
var redText = false;

$(document).ready(function() {
	$("#startGameButton").click(function() {
		startGame();
	});

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

		// Dersom key er mellomrom eller punktum
		if (keyEvent.which == 32 || keyEvent.which == 46) {
			var textToAnimate = $("#greenText").text();
			console.log(textToAnimate);
			$("#greenText").text("");
			$("#fadingText").text(textToAnimate);
			$("#fadingText").animate({
				opacity: 0.25,
				top: '+=500'
			}, 400, function() {
				$("#fadingText").text("");
				$("#fadingText").css("top", "-=500");
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
	console.log("keyPressed: " + keyPressed  + " (" + keyEvent.which + ")");
}

function updatePoints() {
	$("#numberOfPoints").text(correctCharacters);
}

function startGame() {
	runTimer();
}

function runTimer() {
	var seconds = 10;

	countdown = setInterval(function() {
		$("#timeLeft").text(seconds);

		if (seconds == 0) {
			alert("Tiden er ute!");
		}
		seconds--;
	}, 1000);
}






















