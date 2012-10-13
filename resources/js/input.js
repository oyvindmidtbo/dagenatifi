var textToMatch = "Dette er teksten som skal matches. Det ble stille og russeren viste hvordan den sorte ingeniøren fungerte. Plutselig så de tjueen hobitter som kom ved siden av kartongen. Boken kom og satt. En venn ristet ei løvinne bestemt. Soldaten lekte leiligheten rett ved en lysegrønn fiskebåt. En turist malte en osthøvel. Trompetene ankom, mens gullfiskene sang på turbinen. En figur malte en moped. En kjempehelt hørte datamaskinen til purkene.";
var correctCharacters = 0;
var errors = 0;
var redText = false;
var gameOver = true;

$(document).ready(function() {
	$("#startGameButton").click(function() {
		startGame();
	});

	$("#registerButton").click(function() {
		registerScore();
	});	

	$("#normalText").text(textToMatch);
	
	$(document).keypress(function(event) {
  		checkInputText(event);
	}); 	
});

function checkInputText(keyEvent) {
	if (gameOver) {
		return;
	}

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
				top: "+=500"
			}, 400, function() {
				$("#fadingText").text("");
				$("#fadingText").css("top", "-=500");
			});
		}

		correctCharacters++;
		updateCorrect();
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
		}

		errors++;
		updateErrors();
	}
	console.log("keyPressed: " + keyPressed  + " (" + keyEvent.which + ")");
}

function updateCorrect() {
	$("#numberOfCorrect").text(correctCharacters);
	updatePoints();
}

function updateErrors() {
	$("#numberOfErrors").text(errors);
	updatePoints();
}

function updatePoints() {
	$("#numberOfPoints").text(correctCharacters - errors);
}

function startGame() {
	gameOver = false;
	runTimer();
}

function runTimer() {
	var seconds = 300; // ganger 10

	countdownSeconds = setInterval(function() {
		$("#secondsLeft").text(function() {
			if (seconds % 10 == 0) {
				return seconds / 10 + ",0";
			} else {
				return (seconds / 10 + "").replace(".", ",");
			}
		});
		
		if (seconds == 0) {
			gameOver = true;
			clearInterval(countdownSeconds);
			showRegistrationForm();
		}
		seconds--;
	}, 100);
}

function showRegistrationForm() {
	$("#finalPoints").text(correctCharacters - errors);
	$("#contactForm").modal();
	$("#contactForm").css("visibility", "visible");
}

function registerScore() {
	$.modal.close();

	// Kode for å registrere poengsummen
}