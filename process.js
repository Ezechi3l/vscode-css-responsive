module.exports = class Process {

	constructor(config) {
		this.config = config;
		this.regex = /-?(\d+)([.]?\d*)?(px|em|vh|vw|mm|in|pt|pc|ex|ch|rem|vmin|vmax|%)?\/-?(\d+)([.]?\d*)?(px|em|vh|vw|mm|in|pt|pc|ex|ch|rem|vmin|vmax|%)?/;
		this.regexValues = /px|em|vh|vw|mm|in|pt|pc|ex|ch|rem|vmin|vmax/g;
		this.noCommaLanguages = ['sass', 'stylus'];
		this.setDto();
	}

	setDto(insertText = null, result = null, resultText = null) {
		this.dto = {
			insertText: insertText,
			result: result,
			resultText: resultText
		};
	}

	getResultText(percent, language, insertText) {
		var resultText = `${percent.toString()}%;`;

		if (this.config.comments) {
			resultText += ` /* ${insertText} */`;
		}
		return this.handleSyntaxLanguage(resultText, language);
	}

	handleSyntaxLanguage(text, language) {
		if (this.noCommaLanguages.indexOf(language) > -1) {
			text = text.replace(';', '').replace('/*', '//').replace('*/', '').trim();
		}

		return text;
	}

	run(line, language) {
		//Reset the dto
		this.setDto();
		console.log('CALL');
		if (this.regex.test(line)) {
			var insertText = this.regex.exec(line).shift();
			var expr = insertText.replace(this.regexValues, "");
			var percent = eval(expr) * 100;

			if (Number.isNaN(percent) || percent === Infinity) {
				return this.dto;
			}

			if (!Number.isInteger(percent)) {
				percent = Number(
					Number
						.parseFloat(percent.toString())
						.toFixed(this.config.fixedDigits)
				);
			}

			this.setDto(
				insertText,
				percent,
				this.getResultText(percent, language, insertText)
			);
		}

		return this.dto;
	}
}
