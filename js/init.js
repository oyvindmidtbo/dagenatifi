$(function() {
	preventBackspace();
	fillData();
	bindKeys();
});

function preventBackspace() {
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
}

function fillData() {
	for(var i in data.asArray()) {
    var value = data.getValue(i);
    $(".text").append('<span id="' + i + '">' + value + '</span>');
  }
}

function bindKeys() {
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
          $(".status-message").text("Feil under lagring av informasjon.");
          $(".status-message").addClass("status-message-error");
          $(".status-message").slideDown(300);
        });
      } else {
        $(".status-message").text("Obs, skriv inn all informasjon!");
        $(".status-message").addClass("status-message-error");
        $(".status-message").slideDown(300);
      }
    }
  });
}