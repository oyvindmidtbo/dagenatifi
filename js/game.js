var game = (function() {
	var letter = 0;
	var correct = 0;
	var wrong = 0;
	

	function start() {
		timer.countdown(function() {
			$(document).keypress(function(event) {
		  		checkInputText(event);
			});
			
			timer.start(function() {
				$(document).unbind("keypress");
				timer.finish();
			});
		});
	}
	
	function checkInputText(keyEvent) {
		var prevMargin = 0;
		var span = getNextSpan();
		var character = getNextLetter();
		var keyPressed = String.fromCharCode(keyEvent.which);

		if (keyPressed === character) {
			span.removeClass("wrong");
			span.addClass("correct");
			addCorrect(1);
			moveToNextLetter();
		} else {
			$("body").effect().stop(true);
			$("body").css("background-color", "#111");
			$("body").effect("highlight", {
				color: "#FD5157"
			}, 300);

			span.addClass("wrong");
			$("#soundHandle")[0].play();
			addWrong(1);
		}

		if (character === " ") { 
			var move = (span.position().left - prevMargin)
			prevMargin = span.position().left;
			$(".text").animate({
				marginLeft: "-" + move + "px"
			}, 800);
		}
	}

	function moveToNextLetter() {
		letter += 1;
	}

	function addCorrect(points) {
		correct += points;
		updateScore();
	}
	
	function addWrong(points) {
		wrong += points;
		updateScore();
	}
	
	function getCorrect() {
		return correct;
	}

	function getWrong() {
		return wrong;
	}
	
	function getScore() {
		return correct-wrong;
	}
	
	function updateScore() {
		$(".total-score").text(getScore());
	}
	
	function getNextLetter() {
		return data.asArray()[letter];
	}
	
	function getNextSpan() {
		return $("#" + letter);
	}
	
	function isFinished() {
		return letter === data.length();
	}
	
	function isFirstLetter() {
		return letter === 0;
	}

	function closeContactForm() {
		$(".fancybox-wrap.final-result-wrap").hide(0, function() {
			$("#fancybox-overlay").fadeOut(500);
			window.location.reload();
		});
	}
	
	return {
		start: start,
		getCorrect: getCorrect,
		getWrong: getWrong,
		getScore: getScore,
		closeContactForm: closeContactForm
	}
})();

$(function() {
	// window.onbeforeunload = function(e) {
	// 	e.preventDefault(); // prevent the user from leaving the page
	// }

	window.onkeydown = function (event) {
	
	if (!event) { /* This will happen in IE */
		event = window.event;
	}
		
	var keyCode = event.keyCode;
	
	if (keyCode == 8 &&
		((event.target || event.srcElement).tagName != "TEXTAREA") && 
		((event.target || event.srcElement).tagName != "INPUT")) { 
		
		if (navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
			event.stopPropagation();
		} else {
			alert("prevented");
			event.returnValue = false;
		}
		
		return false;
	}
};	

	for(var i in data.asArray()) {
		var value = data.getValue(i);
		$(".text").append('<span id="' + i + '">' + value + '</span>');
	}

	$(document).keypress(function(event) {
  		if(event.which === 13) {
  			$(document).unbind("keypress");
  			$(".start-button").click();
  		}
	});
	
	$(".start-button").click(function() {
		$(".fancybox-wrap.start-wrap").hide(0, function() {
			game.start();
		});
	})
	
	$(".final-result-close").click(function() {
		game.closeContactForm();
	})

	$(".final-result").keypress(function(event) {
		$(".status-message").slideUp(300);
		var enterKeyCode = 13;
		
		if (event.which === enterKeyCode) {
			var name = $("#participantName").val();
			var phone = $("#participantPhone").val();
			var mail = $("#participantMail").val();
			var points = game.getScore();

			if (name && phone && mail) {
				io.postScore(name, phone, mail, points, function(data) {
					$(".status-message").removeClass("status-message-error");
					$(".status-message").text("Informasjonen ble lagret.");
					$(".status-message").addClass("status-message-success");
					$(".status-message").slideDown(300).delay(1000).slideUp(300, function() {
						game.closeContactForm();
					});
				}, function(data) {
					console.log("Feil under lagring av informasjon: ");
					console.log(data);
					$(".status-message").text("Feil under lagring av informasjonen.");
					$(".status-message").addClass("status-message-error");
					$(".status-message").slideDown(300);
				});
			} else {
				$(".status-message").text("Ops, skriv inn all informasjon!");
				$(".status-message").addClass("status-message-error");
				$(".status-message").slideDown(300);
			}
		}
	});
});
