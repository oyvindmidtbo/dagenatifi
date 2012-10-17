var data = (function() {
	var textToMatch = "Dette er teksten som skal matches. Det ble stille og russeren viste hvordan den sorte ingeniøren fungerte. Plutselig så de tjueen hobitter som kom ved siden av kartongen. Boken kom og satt. En venn ristet ei løvinne bestemt. Soldaten lekte leiligheten rett ved en lysegrønn fiskebåt. En turist malte en osthøvel. Trompetene ankom, mens gullfiskene sang på turbinen. En figur malte en moped. En kjempehelt hørte datamaskinen til purkene.";
	var textArray = textToMatch.split("");
		
	function asArray() {
		return textArray;
	}
	
	function getValue(i) {
		var text = textArray[i];
		if(text === " ") {
			return "&nbsp;"
		} else {
			return text;
		}
	}
	
	function length() {
		return textArray.length;
	}
	
	return {
		asArray: asArray,
		getValue: getValue,
		length: length
	}
})();