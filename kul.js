if (!String.prototype.endsWith) {
	String.prototype.endsWith = function (search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}

const randomElement = array =>
	array[(Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) % array.length)];

const capitalizeFirstLetter = string =>
	string.charAt(0).toUpperCase() + string.slice(1);

const makeString = (tile, easter, capital) => {
	let result = tile.text
		.replace("%s", easter ? tile.easter : tile.christmas)
		.replace("%e", randomElement(encyclicals));
	return capital ? capitalizeFirstLetter(result) : result;
}

const generateText = (sentences, easter) => {
	s = "";
	for (let i = 0; i < sentences; ++i) {
		let capitalizeNext = false;
		for (let j = 0; j < tiles.length; ++j) {
			s += makeString((!s.length ? tiles[0][0] : randomElement(tiles[j])), easter, capitalizeNext);
			capitalizeNext = s.endsWith(".") || s.endsWith("!") || s.endsWith(".</i>") || s.endsWith("!</i>");
			s += " ";
		}
	}
	return s;
}

const validateAndGenerate = (sentencesId, easterId, letterId) => {
	let sentences = parseInt(document.getElementById(sentencesId).value);
	let easter = document.getElementById(easterId).value === "easter";
	let letter = document.getElementById(letterId);
	if (!sentences || sentences < 1 || sentences > 100)
		alert("Nieprawidłowa liczba zdań.");
	else
		letter.innerHTML = generateText(sentences, easter);
}