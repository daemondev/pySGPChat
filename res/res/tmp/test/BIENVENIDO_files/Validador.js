
//SOLO LETRAS
function sololetras(e) {
	var key;
	if (window.event) // IE
	{
		key = e.keyCode;
	}
	else if (e.which) // Netscape/Firefox/Opera
	{
		key = e.which;
	}
	if (key > 32 && (key < 64 || key > 90) && (key < 97 || key > 122)) {
		return false;
	}
	return true;
}

//SOLO NUMEROS
function solonumeros(e) {
	var key;
	if (window.event) // IE
	{
		key = e.keyCode;
	}
	else if (e.which) // Netscape/Firefox/Opera
	{
		key = e.which;
	}
	if (key < 48 || key > 57) {
		return false;
	}
	return true;
}

function validateMMYYYY(cadena) {
	var reg = new RegExp("(((0[123456789]|10|11|12)/(([1][9][0-9][0-9])|([2][0-9][0-9][0-9]))))");

	if (reg.test(cadena))
		return true;
	else
		return false;
}